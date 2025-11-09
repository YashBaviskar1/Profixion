# Security Audit Report

## Critical Issues

### CORS Misconfiguration - Wildcard Allowed Origins
**Affected Files**: `backend/index.js:12`, `backend/server.js:8`  
**Severity**: Critical  
**Type**: CWE-942, OWASP A05:2021  
**Description**: CORS is enabled with default settings allowing all origins, enabling CSRF attacks and unauthorized API access.  
**Evidence**: `app.use(cors());` without origin restrictions

### Hardcoded API Secrets in Repository
**Affected Files**: `backend/audit_engine/linkinden_data_ingestion.js:15`, `backend/test.rest:22,35,39,90`  
**Severity**: Critical  
**Type**: CWE-798, OWASP A01:2021  
**Description**: BrightData API bearer token hardcoded in source code: `Bearer f67c6a5a674516eb1fb20c3b12ded4cd1f011cde3caa9f96479512d72dff84ae`  
**Evidence**: `"Authorization": "Bearer f67c6a5a674516eb1fb20c3b12ded4cd1f011cde3caa9f96479512d72dff84ae"`

### Missing Authentication on Sensitive Endpoints
**Affected Files**: `backend/routes/audit.js:15,131,163,281`  
**Severity**: Critical  
**Type**: CWE-306, OWASP A01:2021  
**Description**: Audit endpoints (submit, status, generate-pdf, download-pdf) lack authentication, enabling IDOR and unauthorized access to user audit data.  
**Evidence**: No auth middleware on `/api/audit/*` routes; accepts `authId` from client without verification

### Insecure Payment Verification Logic
**Affected Files**: `backend/routes/payment.js:77`  
**Severity**: Critical  
**Type**: CWE-330, OWASP A02:2021  
**Description**: Payment verification uses fallback placeholder secret if env var missing: `process.env.RAZORPAY_KEY_SECRET || "test_secret_placeholder"`  
**Evidence**: `createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret_placeholder")`

### No Rate Limiting on API Endpoints
**Affected Files**: `backend/index.js`, `backend/routes/*`  
**Severity**: High  
**Type**: CWE-307, OWASP A04:2021  
**Description**: No rate limiting middleware configured, allowing brute force, DoS, and abuse of payment/audit/contact endpoints.  
**Evidence**: No rate limiting packages or middleware in `package.json` or route handlers

## High Issues

### Stored XSS in Contact Form Email Template
**Affected Files**: `backend/routes/contact.js:103-137`  
**Severity**: High  
**Type**: CWE-79, OWASP A03:2021  
**Description**: User input (`name`, `email`, `subject`, `message`) directly interpolated into HTML email template without sanitization.  
**Evidence**: `${name}`, `${email}`, `${subject}`, `${message}` used in template literals within HTML

### Insecure Direct Object Reference (IDOR) in Audit Status
**Affected Files**: `backend/routes/audit.js:131-156`  
**Severity**: High  
**Type**: CWE-639, OWASP A01:2021  
**Description**: `/api/audit/status/:trackingId` endpoint allows any user to access any audit by guessing/brute-forcing tracking IDs without ownership verification.  
**Evidence**: `router.get("/status/:trackingId", ...)` queries by `tracking_id` only, no `auth_id` check

### Path Traversal in PDF Download
**Affected Files**: `backend/routes/audit.js:281-326`  
**Severity**: High  
**Type**: CWE-22, OWASP A01:2021  
**Description**: PDF filename from URL parameter used without validation, allowing directory traversal attacks via `../` sequences.  
**Evidence**: `const { filename } = req.params; const pdfPath = path.resolve(reportsDir, filename);` - only checks `.pdf` extension

### Missing Input Validation on Payment Amount
**Affected Files**: `backend/routes/payment.js:29-46`  
**Severity**: High  
**Type**: CWE-20, OWASP A03:2021  
**Description**: Payment order creation accepts `amount` from client without validation, enabling negative/zero/excessive amount manipulation.  
**Evidence**: `const { amount } = req.body; if (!amount) { ... }` - only checks existence, not range/type

### Client-Side Payment State Control
**Affected Files**: `src/components/CTA.jsx:14`, `src/components/PaymentButton.jsx:56`  
**Severity**: High  
**Type**: CWE-602, OWASP A01:2021  
**Description**: Payment verification relies on client-controlled localStorage flag (`auditPaid`), easily bypassable by attackers.  
**Evidence**: `localStorage.getItem('auditPaid') === '1'` used for authorization

### SSRF Risk in Webhook Endpoint
**Affected Files**: `backend/routes/audit.js:67-125`  
**Severity**: High  
**Type**: CWE-918, OWASP A10:2021  
**Description**: Webhook endpoint processes external payloads without validating source, enabling SSRF if BrightData compromised or webhook URL spoofed.  
**Evidence**: `router.post("/webhook", ...)` accepts `req.body` directly; no webhook signature verification

### Missing Security Headers
**Affected Files**: `backend/index.js`, `backend/server.js`  
**Severity**: High  
**Type**: OWASP A05:2021  
**Description**: No security headers configured (X-Frame-Options, X-Content-Type-Options, CSP, HSTS, etc.), increasing XSS/clickjacking risks.  
**Evidence**: Express app configuration lacks helmet or custom security headers

## Medium Issues

### Insecure Deserialization of Audit Reports
**Affected Files**: `backend/routes/audit.js:192`, `backend/geminiClient.js:114`  
**Severity**: Medium  
**Type**: CWE-502, OWASP A08:2021  
**Description**: `JSON.parse()` on database-stored audit reports and external API responses without validation, enabling prototype pollution or RCE if data compromised.  
**Evidence**: `parsedAuditData = JSON.parse(audit.audit_report);` and `return JSON.parse(jsonText);`

### Duplicate Route Handler
**Affected Files**: `backend/routes/payment.js:103-135`  
**Severity**: Medium  
**Type**: CWE-665  
**Description**: Duplicate `/orders` route handler defined (lines 29-60 and 103-135), causing unpredictable behavior and potential bypass scenarios.  
**Evidence**: Two identical `router.post("/orders", ...)` definitions in same file

### Hardcoded ngrok URL in Frontend Config
**Affected Files**: `src/config.js:3`  
**Severity**: Medium  
**Type**: CWE-547  
**Description**: Hardcoded ngrok URL fallback exposes development infrastructure: `"https://c67e713be943.ngrok-free.app/api"`  
**Evidence**: `|| "  https://c67e713be943.ngrok-free.app/api"`

### Environment Variable Exposure in Error Responses
**Affected Files**: `backend/routes/contact.js:179`  
**Severity**: Medium  
**Type**: CWE-209  
**Description**: Error details exposed in production responses when `NODE_ENV === 'development'`, potentially leaking stack traces or sensitive info.  
**Evidence**: `details: process.env.NODE_ENV === 'development' ? error.message : undefined`

### Weak URL Validation in Frontend
**Affected Files**: `src/components/CTA.jsx:25`  
**Severity**: Medium  
**Type**: CWE-20  
**Description**: LinkedIn URL regex only validates format client-side; server lacks equivalent validation, enabling protocol/domain manipulation.  
**Evidence**: `/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/` - no server-side check

### Missing HTTPS Enforcement
**Affected Files**: `backend/index.js:29`  
**Severity**: Medium  
**Type**: OWASP A02:2021  
**Description**: Server logs and configuration don't enforce HTTPS, allowing man-in-the-middle attacks on production.  
**Evidence**: HTTP server configuration without redirect or TLS enforcement

### Insufficient Logging/Monitoring
**Affected Files**: All route files  
**Severity**: Medium  
**Type**: OWASP A09:2021  
**Description**: Missing security event logging (failed auth, payment attempts, audit access, errors). No monitoring for suspicious activity.  
**Evidence**: Only console.log/error used; no structured logging or audit trail

## Low Issues

### Missing CSRF Protection
**Affected Files**: All POST/PUT/DELETE routes  
**Severity**: Low  
**Type**: OWASP A07:2021  
**Description**: No CSRF tokens or SameSite cookie flags implemented for state-changing operations (payments, audit submissions).  
**Evidence**: No csrf middleware or token validation in routes

### Hardcoded Test Data in Payment Component
**Affected Files**: `src/components/PaymentButton.jsx:67`  
**Severity**: Low  
**Type**: CWE-547  
**Description**: Default prefill data contains placeholder values that may appear in production if prefill not provided.  
**Evidence**: `prefill: prefill || { name: "Test User", email: "test@example.com", contact: "9999999999" }`

### Missing Request Size Limits
**Affected Files**: `backend/index.js:13`  
**Severity**: Low  
**Type**: CWE-400  
**Description**: `express.json()` lacks size limit configuration, enabling DoS via large payloads.  
**Evidence**: `app.use(express.json());` without limit option

### Information Disclosure in Test Endpoint
**Affected Files**: `backend/routes/contact.js:48-75`  
**Severity**: Low  
**Type**: CWE-209  
**Description**: `/api/contact/test` endpoint exposes email configuration details (mode, recipient) without authentication.  
**Evidence**: `router.get('/test', ...)` returns email addresses and config state




