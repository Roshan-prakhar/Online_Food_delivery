# Local Deployment Guide

End-to-end setup to run the full stack on Windows: Spring Boot backend (PostgreSQL + JPA) + customer frontend + admin panel.

---

## 1. Prerequisites

Install (one-time):

| Tool | Version | Download |
|---|---|---|
| **JDK** | 21+ | https://adoptium.net/ |
| **Maven** | 3.8+ | https://maven.apache.org/download.cgi |
| **Node.js** | 18+ | https://nodejs.org/ |
| **PostgreSQL** | 14+ | https://www.postgresql.org/download/windows/ |

Verify in PowerShell:
```powershell
java -version
mvn -version
node -v
psql --version
```

---

## 2. Database Setup (PostgreSQL)

Open PowerShell:

```powershell
# Connect as the postgres superuser
psql -U postgres

# Inside psql:
CREATE DATABASE foodies;
\q
```

The default credentials assumed by the app are:
- **URL:** `jdbc:postgresql://localhost:5432/foodies`
- **User:** `postgres`
- **Password:** `postgres`

If your local Postgres uses a different password, edit `foodiesapi/.env.local` (see step 4).

Hibernate will create all tables automatically (`ddl-auto=update`) on first backend startup.

---

## 3. Free Cloud Accounts (No Credit Card)

Follow `FREE_SETUP_GUIDE.md` to create these and copy their keys:

- **Cloudinary** (image storage) — https://cloudinary.com (free, no card)
- **Razorpay Test Mode** (payments) — https://dashboard.razorpay.com/signup (free, no card, no KYC)

You'll need these values:
```
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
RAZORPAY_KEY (rzp_test_...), RAZORPAY_SECRET
```

---

## 4. Configure Backend Env Vars

Edit `@/c:/Users/BIT/Downloads/online-food-delivery-project/foodiesapi/.env.local` with your real values. Spring Boot does **not** auto-load `.env` files — you must export them in your shell before starting the backend, or set them via your IDE's run config.

### Option A — Export then run (PowerShell)

```powershell
$env:DATABASE_URL = "jdbc:postgresql://localhost:5432/foodies"
$env:DB_USERNAME  = "postgres"
$env:DB_PASSWORD  = "postgres"
$env:JWT_SECRET   = "<paste_64_char_random_hex_here>"
$env:CLOUDINARY_CLOUD_NAME = "your_cloud_name"
$env:CLOUDINARY_API_KEY    = "your_api_key"
$env:CLOUDINARY_API_SECRET = "your_api_secret"
$env:CLOUDINARY_FOLDER     = "foodies"
$env:RAZORPAY_KEY    = "rzp_test_xxxxxxxx"
$env:RAZORPAY_SECRET = "xxxxxxxxxxxxxxxx"

cd foodiesapi
mvn spring-boot:run
```

### Option B — Pass directly to Maven

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--CLOUDINARY_CLOUD_NAME=xxx --CLOUDINARY_API_KEY=xxx --CLOUDINARY_API_SECRET=xxx --JWT_SECRET=xxx --RAZORPAY_KEY=xxx --RAZORPAY_SECRET=xxx"
```

### Defaults baked in

If `DATABASE_URL`, `DB_USERNAME`, `DB_PASSWORD` are unset, the app falls back to `localhost:5432/foodies` with `postgres`/`postgres`. So you only **must** export `JWT_SECRET`, `CLOUDINARY_*`, and `RAZORPAY_*`.

---

## 5. Start Everything

Open **3 PowerShell windows** at the project root:

### Window 1 — Backend (port 8080)
```powershell
# After exporting env vars (step 4):
.\start-backend.bat
```
Wait for `Started FoodiesapiApplication in N seconds`.

### Window 2 — Customer Frontend (port 5173)
```powershell
.\start-frontend.bat
```
Open http://localhost:5173

### Window 3 — Admin Panel (port 5174)
```powershell
.\start-admin.bat
```
Open http://localhost:5174

---

## 6. Sanity Check

```powershell
# Backend reachable?
curl http://localhost:8080/api/foods
# Expected: []  (empty array initially)
```

Then in the **admin panel** at http://localhost:5174:
1. Go to **Add Food**.
2. Upload an image, fill the form, save.
3. Image goes to Cloudinary; metadata to Postgres `foods` table.

In the **customer frontend** at http://localhost:5173:
1. Click **Register**, create an account.
2. **Login**.
3. Browse foods → add to cart → place order.
4. Razorpay test modal appears — use card `4111 1111 1111 1111`, expiry any future, CVV `123`, OTP `1234`.
5. Confirm in **My Orders**.

---

## 7. Common Issues

| Symptom | Fix |
|---|---|
| `Connection to localhost:5432 refused` | Postgres not running. Start service: `Get-Service postgresql*` then `Start-Service postgresql-x64-16` (or matching name). |
| `password authentication failed for user "postgres"` | Set `DB_PASSWORD` to your real Postgres password before starting backend. |
| `database "foodies" does not exist` | Run `CREATE DATABASE foodies;` in psql (step 2). |
| `cloud_name not set` on startup | `CLOUDINARY_*` env vars not exported. Re-do step 4. |
| `Authentication failed` from Razorpay | Verify keys are **test** keys (`rzp_test_` prefix) and secret is correct. |
| 401 on protected endpoints | Token expired (10 hr). Log out and log back in. |
| CORS blocked in browser | Frontend must run on 5173 or 5174 (whitelisted in `SecurityConfig`). |
| Lombok errors in IDE | Install Lombok plugin (IntelliJ) / annotation processing enabled. |

---

## 8. Optional: Run Without PostgreSQL (H2 Dev Profile)

If you want zero-install local dev (no Postgres), there's an H2 in-memory profile:

```powershell
$env:SPRING_PROFILES_ACTIVE = "dev"
.\start-backend.bat
```

H2 web console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:foodies`, user `sa`, no password). Data is wiped on every restart.

---

## 9. Architecture Recap

- **Backend:** Spring Boot 3.4.3 / Java 21 / Spring Security (JWT) / Spring Data JPA / PostgreSQL / Cloudinary / Razorpay.
- **Frontend (customer):** React 18 + Vite + React Router 7 + Axios. Port 5173.
- **Admin Panel:** React 19 + Vite + React Router 7. Port 5174.
- **Auth:** JWT in `Authorization: Bearer <token>` header; stored in `localStorage`.
- **DB tables auto-created:** `users`, `foods`, `carts`, `cart_items`, `orders`, `order_items`.

---

## 10. First-Time Build (Important)

The first `mvn spring-boot:run` will download all dependencies (including the new JPA + Postgres + Cloudinary jars). This may take 1-3 minutes. Subsequent starts are instant.

If the IDE shows red imports for `com.cloudinary` / `jakarta.persistence`, run once to populate the local Maven repo:

```powershell
cd foodiesapi
.\mvnw clean install -DskipTests
```

After that, refresh / reimport the Maven project in your IDE and all errors should disappear.
