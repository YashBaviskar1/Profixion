import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config(); // Load .env before using keys

const app = express();

// CORS configuration (strict by default)
const parseAllowedOrigins = () => {
  const raw = process.env.ALLOWED_ORIGINS || "";
  return raw
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);
};
const allowedOrigins = new Set(parseAllowedOrigins());
const allowCredentials = (process.env.ALLOW_CREDENTIALS || "false").toLowerCase() === 'true';
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, false);
    const isAllowed = allowedOrigins.has(origin);
    return callback(null, isAllowed);
  },
  credentials: allowCredentials,
};
app.use(cors(corsOptions));

// Security headers
app.use(helmet());
if ((process.env.DISABLE_CSP || "0") !== '1') {
  app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", 'data:'],
      "style-src": ["'self'", "'unsafe-inline'"],
      "script-src": ["'self'"],
      "connect-src": ["'self'", ...Array.from(allowedOrigins)],
    },
  }));
}
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
if ((process.env.NODE_ENV || 'development') === 'production') {
  app.use(helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: true,
    preload: (process.env.HSTS_PRELOAD || '0') === '1',
  }));
}

app.use(express.json());

// Import payment routes
import paymentRoutes from "./routes/payment.js";
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));


