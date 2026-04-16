# ========================================
# QUICK START - Foodies Local Deployment
# ========================================

The project has been configured for local testing with JWT authentication enabled.

## 🚀 QUICK SETUP (3 Steps)

### Step 1: Ensure Prerequisites
- [ ] Java 21+ installed: `java -version`
- [ ] Maven 3.8+ installed: `mvn -version`
- [ ] Node.js 18+ installed: `node -v`
- [ ] PostgreSQL running on localhost:5432
- [ ] Database 'foodies' created

### Step 2: Start Services
Open 3 separate terminals in the project root:

**Terminal 1 - Backend API (Port 8080):**
```
start-backend.bat    (Windows)
./start-backend.sh   (Linux/Mac)
```

**Terminal 2 - Frontend (Port 5173):**
```
start-frontend.bat   (Windows)
npm run dev -w foodies  (Linux/Mac)
```

**Terminal 3 - Admin Panel (Port 5174) - Optional:**
```
start-admin.bat      (Windows)
npm run dev -w adminpanel -- --port 5174  (Linux/Mac)
```

### Step 3: Test in Browser
1. Open: http://localhost:5173
2. Register new account
3. Login with credentials
4. Test navigation (cart, orders, etc.)

## ✅ Verify Everything Works

### Backend Health
```
curl http://localhost:8080/actuator/health
```
Expected: `{"status":"UP"}`

### Test Authentication
Register and login in the UI, then check:
```javascript
// In browser console (F12):
localStorage.getItem('token')  // Should show JWT token
```

## 📖 Full Documentation
For detailed setup, troubleshooting, and advanced configuration:
→ See: LOCAL_DEPLOYMENT_GUIDE.md
→ Authentication details: AUTHENTICATION_GUIDE.md

## 🔑 Key Changes Made

✅ JWT Authentication Filter ENABLED
✅ Token Storage & Retrieval IMPLEMENTED
✅ Axios Interceptors CONFIGURED
✅ Auth Persistence on Page Refresh WORKING
✅ 401 Error Handling with Auto-Redirect READY

## 🎯 Test Scenarios to Try

1. **Register**: Create new account
2. **Login**: Use credentials
3. **Protected Route**: Try accessing /cart (requires login)
4. **Token Expiry**: Wait 10 hours or modify JWT expiration
5. **Logout**: Clear localStorage manually
6. **Re-login**: Verify token re-generation

## ⚙️ Environment Files Created

- `foodiesapi/.env.local` - Backend config
- `foodies/.env.local` - Frontend config
- `adminpanel/.env.local` - Admin config

All configured for localhost development.

## 📝 Ports Used

- 5173: Main Frontend (React/Vite)
- 5174: Admin Panel (React/Vite)
- 8080: Backend API (Spring Boot)
- 5432: PostgreSQL

## 🛑 Troubleshooting Quick Tips

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process using that port |
| DB connection refused | Start PostgreSQL service |
| Maven not found | Install Maven or add to PATH |
| CORS error | Verify backend is running & check browser console |
| Token not saving | Clear cache (Ctrl+Shift+Delete) |
| 401 errors | Ensure token exists: `localStorage.getItem('token')` |

## 🎉 You're All Set!

The authentication system is fully integrated. Start the services and begin testing!

For issues, check:
1. Browser Console (F12)
2. Backend Terminal Output
3. LOCAL_DEPLOYMENT_GUIDE.md (Full guide)
