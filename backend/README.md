# Profixion Backend - Razorpay Integration

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with your Razorpay credentials:

```env
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
PORT=5000
```

### 3. Get Razorpay Credentials
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate a new key pair
4. Copy the Key ID and Key Secret to your `.env` file

## Security-related Environment Variables

- `ALLOWED_ORIGINS` — Comma-separated allowed origins for CORS (default: none)
- `ALLOW_CREDENTIALS` — `true|false` to allow credentialed CORS (default: false)
- `DISABLE_CSP` — Set `1` to disable Content Security Policy (default: enabled)
- `HSTS_PRELOAD` — Set `1` to add preload to HSTS when `NODE_ENV=production`
- `PUBLIC_URL` — Public base URL of this API used in callbacks/webhooks

### 4. Run the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/payment/orders
Creates a new Razorpay order.

**Request Body:**
```json
{
  "amount": 299
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_xxx",
    "amount": 29900,
    "currency": "INR",
    "receipt": "receipt_xxx"
  }
}
```

### POST /api/payment/verify
Verifies the payment signature.

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "payment_id": "pay_xxx"
}
```

## Security Notes
- Never commit your `.env` file to version control
- Use test credentials for development
- Verify payment signatures on the server side
- Handle errors gracefully in production
