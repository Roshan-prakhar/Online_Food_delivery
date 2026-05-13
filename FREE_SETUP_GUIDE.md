# Free Setup Guide (No Credit Card Required)

This guide walks you through getting the project fully working with **zero cost** and **no credit card**, using:

- **Cloudinary** for food image storage (replaces AWS S3)
- **Razorpay Test Mode** for payments (no KYC, no card)

---

## 1. Cloudinary Setup (Image Storage)

Cloudinary's free tier offers **25 GB storage + 25 GB bandwidth/month forever** with **no credit card** required.

### Steps

1. Go to https://cloudinary.com/users/register_free
2. Sign up with email + password (or Google/GitHub OAuth).
3. Verify email.
4. On the **Dashboard**, scroll to the **"Account Details"** / **"Product Environment Credentials"** section. You will see:
   - `Cloud name`
   - `API Key`
   - `API Secret` (click the eye icon to reveal)
5. Copy these into `foodiesapi/.env.local`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_FOLDER=foodies
   ```

That's it — uploaded food images will land in the `foodies/` folder of your Cloudinary media library and be served from `https://res.cloudinary.com/<cloud_name>/...`.

---

## 2. Razorpay Test Mode Setup (Payments)

Razorpay **Test Mode** is **100% free**, requires **no credit card**, and **no KYC**. You only need a phone number for OTP.

### Steps

1. Go to https://dashboard.razorpay.com/signup
2. Sign up with email + phone (OTP verification only).
3. **Skip** the "Activate Account" / KYC flow — your account stays in **Test Mode** indefinitely.
4. In the dashboard, switch the toggle (top-left) to **Test Mode** (orange).
5. Navigate to **Account & Settings → API Keys → Generate Test Key**.
6. Copy `Key Id` (starts with `rzp_test_...`) and `Key Secret`.
7. Paste into `foodiesapi/.env.local`:
   ```
   RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
   RAZORPAY_SECRET=xxxxxxxxxxxxxxxxxx
   ```

### Test Card Details (Razorpay Sandbox)

When prompted to pay, use any of these:

| Method | Value |
|---|---|
| Card | `4111 1111 1111 1111` |
| Expiry | Any future date (e.g., `12/30`) |
| CVV | Any 3 digits (e.g., `123`) |
| Name | Anything |
| OTP | `1234` |
| UPI Success | `success@razorpay` |
| UPI Failure | `failure@razorpay` |

No real money moves. Perfect for portfolio demos.

---

## 3. Running the Project

After setting both `.env.local` files:

```powershell
# Backend (port 8080)
.\start-backend.bat

# Frontend (port 5173)
.\start-frontend.bat

# Admin panel (port 5174)
.\start-admin.bat
```

The backend will:
- Connect to MongoDB at `mongodb://localhost:27017/foodies`.
- Use Cloudinary for image uploads.
- Use Razorpay test mode for payments.

---

## 4. What Changed in the Code

- `pom.xml`: Removed `software.amazon.awssdk:s3`, added `com.cloudinary:cloudinary-http5:1.39.0`.
- Removed `config/AWSConfig.java`.
- Added `config/CloudinaryConfig.java` — exposes a `Cloudinary` Spring bean.
- `service/FoodServiceImpl.java`:
  - Now uses `Cloudinary.uploader().upload(...)` and stores `secure_url`.
  - Deletion uses `Cloudinary.uploader().destroy(public_id, ...)`.
  - Added `extractPublicId()` to derive the public_id from the secure URL.
- `application.properties`: replaced `aws.*` keys with `cloudinary.*` keys.
- `.env` and `.env.local`: replaced Cloudflare R2 placeholders with Cloudinary placeholders.

---

## 5. Troubleshooting

| Issue | Fix |
|---|---|
| `cloud_name not set` error on startup | `.env.local` not loaded. Run via `start-backend.bat` which sources it, or set env vars in your IDE run config. |
| Image upload returns 500 | Check API key/secret are correct (no spaces, secret fully revealed). |
| Razorpay `Authentication failed` | Verify `RAZORPAY_KEY` starts with `rzp_test_` and the secret matches. |
| Mongo connection refused | Start MongoDB (`mongod` or Docker `mongo:latest` on port 27017). |
| 401 from API after login | Token expired (10h). Re-login. |

---

## 6. When You Want to Go Live (Future)

- **Cloudinary**: Upgrade only if you exceed 25 GB or want advanced features. Free tier is enough for years of a portfolio app.
- **Razorpay**: Complete KYC (PAN, bank, business proof) to switch from test → live mode. Per-transaction fee ~2%.

For a learning/portfolio project, **you never need to leave the free tier**.
