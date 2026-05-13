# Hosting Deployment Guide (100% Free, No Credit Card)

Deploy the entire stack to the cloud using only free tiers that **do not require a credit card**.

## Architecture

| Component | Platform | Free Tier |
|---|---|---|
| Backend API | **Render** | Web Service free tier (sleeps after 15 min idle) |
| PostgreSQL | **Neon** | 0.5 GB serverless Postgres, forever free |
| Customer frontend | **Netlify** | Unlimited static sites |
| Admin panel | **Netlify** | Same |
| Image storage | **Cloudinary** | 25 GB storage + 25 GB bandwidth/mo |
| Payments | **Razorpay Test** | Free, no KYC |

You'll end up with three URLs:
- API: `https://foodies-api.onrender.com`
- Customer: `https://foodies-customer.netlify.app`
- Admin: `https://foodies-admin.netlify.app`

---

## Prerequisites

1. Push this project to a **GitHub repo** (Render and Netlify both deploy from GitHub).
2. Have your Cloudinary credentials ready (see `FREE_SETUP_GUIDE.md`).
3. Have your Razorpay test credentials ready (see `FREE_SETUP_GUIDE.md`).

---

## Step 1 — Create a Free PostgreSQL Database (Neon)

1. Go to https://neon.tech and sign up (GitHub login, no credit card).
2. Click **Create Project**.
   - Name: `foodies`
   - Postgres version: 16 (or latest)
   - Region: pick the one closest to where you'll deploy Render (Oregon = US West).
3. After creation, you'll see a **Connection string** like:
   ```
   postgresql://user:password@ep-xxx-xxx.us-west-2.aws.neon.tech/foodies?sslmode=require
   ```
4. Copy three pieces from this string:
   - **Username:** `user` (the part before `:`)
   - **Password:** `password` (between `:` and `@`)
   - **JDBC URL** (rebuild this format):
     ```
     jdbc:postgresql://ep-xxx-xxx.us-west-2.aws.neon.tech/foodies?sslmode=require
     ```
     (just prefix `jdbc:` and drop the `user:password@` part)

Save these — you'll paste them into Render in Step 2.

---

## Step 2 — Deploy Backend to Render

1. Go to https://render.com and sign up (GitHub login, no credit card).
2. Click **New → Blueprint**.
3. Connect your GitHub repo.
4. Render will detect `foodiesapi/render.yaml`. Click **Apply**.
5. The first build will fail (env vars not set yet). Stop the deploy.
6. Go to the new service → **Environment** tab → set these vars:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | `jdbc:postgresql://...neon.tech/foodies?sslmode=require` |
   | `DB_USERNAME` | (Neon username) |
   | `DB_PASSWORD` | (Neon password) |
   | `JWT_SECRET` | a random 64+ char string (or copy from `.env.local`) |
   | `CLOUDINARY_CLOUD_NAME` | (from Cloudinary dashboard) |
   | `CLOUDINARY_API_KEY` | (from Cloudinary dashboard) |
   | `CLOUDINARY_API_SECRET` | (from Cloudinary dashboard) |
   | `RAZORPAY_KEY` | `rzp_test_...` |
   | `RAZORPAY_SECRET` | (Razorpay secret) |
   | `CORS_ALLOWED_ORIGINS` | leave empty for now (set in Step 5) |

7. Click **Manual Deploy → Deploy latest commit**.
8. Watch logs. Wait for `Started FoodiesapiApplication`. Note your URL: `https://foodies-api.onrender.com` (your subdomain may differ).
9. Verify health:
   ```
   https://<your-api>.onrender.com/actuator/health
   ```
   Should return `{"status":"UP"}`.

> **Cold start note:** Render free tier sleeps after 15 min of inactivity. First request after sleep takes ~30-60 sec to wake up.

---

## Step 3 — Deploy Customer Frontend to Netlify

1. Go to https://app.netlify.com and sign up (GitHub login, no credit card).
2. Click **Add new site → Import an existing project**.
3. Pick your GitHub repo.
4. Configure:
   - **Base directory:** `foodies`
   - **Build command:** `npm run build`
   - **Publish directory:** `foodies/dist`
5. Click **Show advanced → New variable**:
   - Key: `VITE_API_URL`
   - Value: `https://<your-api>.onrender.com/api` (from Step 2)
6. Click **Deploy site**.
7. After build, note the URL: `https://<random-name>.netlify.app`. You can rename it under **Site settings → Change site name** (e.g., `foodies-customer`).

---

## Step 4 — Deploy Admin Panel to Netlify

Repeat Step 3 with these differences:
- **Base directory:** `adminpanel`
- **Publish directory:** `adminpanel/dist`
- Same `VITE_API_URL` value
- Rename site to e.g. `foodies-admin`

---

## Step 5 — Update Backend CORS

Now that you know the frontend URLs, go back to Render → backend service → **Environment**:

- Set `CORS_ALLOWED_ORIGINS` to:
  ```
  https://foodies-customer.netlify.app,https://foodies-admin.netlify.app
  ```
  (use your actual Netlify subdomains; comma-separated, no spaces, no trailing slash)

Click **Save Changes** — Render will auto-redeploy.

---

## Step 6 — Smoke Test

1. Open https://foodies-customer.netlify.app
2. Register an account → login.
3. The first API call may take ~60 sec (Render cold start). Subsequent calls are instant.
4. Open https://foodies-admin.netlify.app
5. Add a food item with image. Image goes to Cloudinary, metadata to Neon Postgres.
6. Back in the customer app, place an order. Razorpay test modal appears — use card `4111 1111 1111 1111`, CVV `123`, OTP `1234`.

---

## Step 7 — Custom Domains (Optional)

Both Render and Netlify support free custom domains:
- Buy a cheap domain (Namecheap, Porkbun ~$10/yr).
- In Netlify: **Domain settings → Add custom domain**.
- In Render: **Settings → Custom Domain** (free TLS via Let's Encrypt).

---

## Maintenance & Limits

| Resource | Free Limit | What Happens at Limit |
|---|---|---|
| Render web service | 750 hours/mo | Sleeps after 15 min idle (cold start ~60s) |
| Render bandwidth | 100 GB/mo | Throttled |
| Neon DB | 0.5 GB storage, 1 compute unit | Read-only after exceeded |
| Netlify bandwidth | 100 GB/mo | Throttled |
| Netlify build minutes | 300/mo | Builds queued |
| Cloudinary | 25 GB storage + 25 GB bw/mo | Uploads blocked |

For a portfolio project, you'll never hit any of these.

---

## Common Issues

| Symptom | Fix |
|---|---|
| `502 Bad Gateway` from Render | Cold start. Wait 60 sec and retry. |
| Frontend shows `Network Error` | `VITE_API_URL` wrong, or CORS not updated. Check browser console. |
| `CORS policy: No 'Access-Control-Allow-Origin'` | Update `CORS_ALLOWED_ORIGINS` in Render with the exact frontend URL (no trailing slash). |
| `password authentication failed` | Re-check Neon username/password in Render env. |
| `relation "users" does not exist` | Hibernate `ddl-auto=update` should auto-create. Check Render logs for SSL/connection errors. |
| Image upload 500 error | Cloudinary creds wrong; check Render logs. |
| Build fails on Netlify with "VITE_API_URL undefined" | Set the env var in Netlify site settings, then redeploy. |

---

## What Was Already Configured

- `foodiesapi/Dockerfile` — multi-stage Maven + JRE image, ready for Render.
- `foodiesapi/render.yaml` — Render Blueprint with all required env vars.
- `foodies/netlify.toml` and `adminpanel/netlify.toml` — SPA routing redirects.
- `foodies/.env.production` and `adminpanel/.env.production` — production env defaults.
- Backend port reads `${PORT}` env var (Render injects it).
- Backend CORS reads `${CORS_ALLOWED_ORIGINS}` (comma-separated).
- All frontend service files now use `VITE_API_URL` (no hardcoded localhost).

---

## Recap of URLs You'll Need to Track

```
Backend API:    https://foodies-api.onrender.com
Customer App:   https://foodies-customer.netlify.app
Admin Panel:    https://foodies-admin.netlify.app
Database:       (Neon dashboard)
Images:         (Cloudinary dashboard)
Payments:       (Razorpay dashboard - Test mode)
```

Save these in your password manager or a notes file along with all credentials.
