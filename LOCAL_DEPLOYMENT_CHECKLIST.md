# 🎯 Local Development Deployment Checklist

## ✅ Pre-Deployment Setup

### System Requirements
- [ ] Java 21 or higher installed
- [ ] Maven 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] PostgreSQL 12+ installed and running
- [ ] Git installed

### Verification Commands
```bash
java -version          # Should be 21+
mvn -version          # Should be 3.8+
node -v               # Should be 18+
npm -v                # Should be 8+
psql --version        # Should be 12+
```

### Database Setup
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE foodies;

# Verify database exists
\l

# Should see "foodies" in the list
\q
```

---

## 🚀 Service Startup Checklist

### Terminal 1: Backend API (Port 8080)
- [ ] Navigate to project root
- [ ] Run: `start-backend.bat` (Windows) or `./start-backend.sh` (Linux/Mac)
- [ ] Wait for: "Started FoodiesapiApplication"
- [ ] Verify health: `curl http://localhost:8080/actuator/health`
- [ ] Expected response: `{"status":"UP"}`

### Terminal 2: Frontend (Port 5173)
- [ ] Navigate to project root
- [ ] Run: `start-frontend.bat` (Windows)
- [ ] Wait for: "VITE v4.4.5 running at: http://localhost:5173"
- [ ] Open browser: `http://localhost:5173`
- [ ] Should see Foodies homepage

### Terminal 3: Admin Panel (Optional, Port 5174)
- [ ] Navigate to project root
- [ ] Run: `start-admin.bat` (Windows)
- [ ] Wait for: "VITE vX.X.X running at: http://localhost:5174"
- [ ] Open browser: `http://localhost:5174`
- [ ] Should see Admin panel

---

## ✅ Post-Startup Verification

### Backend Health Check
```bash
curl http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

### Frontend Connectivity
1. [ ] Open: http://localhost:5173
2. [ ] Press F12 to open console
3. [ ] Look for message: "Auth initialized with existing token" or "No token found"
4. [ ] No CORS errors should appear
5. [ ] No 500 errors in network tab

### API Connectivity Test
```bash
# Register a test user
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }'
# Expected: 201 Created with user data
```

---

## 🔐 Authentication Flow Testing

### Step 1: Register New User
- [ ] Navigate to: http://localhost:5173/register
- [ ] Enter:
  - Email: `testuser@example.com`
  - Password: `Test@123456`
  - First Name: `Test`
  - Last Name: `User`
- [ ] Click "Sign up"
- [ ] Should redirect to home page
- [ ] Check browser console for no errors

### Step 2: Login with Credentials
- [ ] Navigate to: http://localhost:5173/login
- [ ] Enter credentials:
  - Email: `testuser@example.com`
  - Password: `Test@123456`
- [ ] Click "Sign in"
- [ ] Should redirect to home page
- [ ] Check for success notification

### Step 3: Verify Token Storage
- [ ] Open browser console (F12)
- [ ] Run: `localStorage.getItem('token')`
- [ ] Should show JWT token (long string starting with "eyJ...")
- [ ] Run: `axios.defaults.headers.common['Authorization']`
- [ ] Should show: `Bearer eyJ...`

### Step 4: Test Protected Routes
After login, test these should work WITHOUT redirect:
- [ ] http://localhost:5173/cart - Should load
- [ ] http://localhost:5173/order - Should load
- [ ] http://localhost:5173/myorders - Should load

---

## 🔍 Console Log Verification

### Backend Logs (Terminal 1)
Look for these patterns:
```
JWT Filter - Request URI: /api/login
JWT Filter - Auth Header: Bearer eyJhbGc...
JWT Util - Token username: testuser@example.com
JWT Filter - Authentication set successfully
```

### Frontend Console (F12 in Browser)
Look for:
```javascript
Auth initialized with existing token
// or
No token found
```

### Network Tab (F12 → Network)
Check requests:
- [ ] `/api/register` → Status 201 Created
- [ ] `/api/login` → Status 200 OK, Response has `token`
- [ ] Protected endpoints → Status 200 OK, Request has `Authorization` header

---

## ⚠️ Troubleshooting Checklist

| Issue | Check | Solution |
|-------|-------|----------|
| Port 8080 in use | `netstat -ano \| findstr :8080` | Kill process or restart machine |
| PostgreSQL won't connect | Is service running? | Start PostgreSQL service |
| Database 'foodies' not found | Connect to psql: `\l` | Create database: `CREATE DATABASE foodies;` |
| CORS error in console | Frontend port = 5173? | Check SecurityConfig allowed origins |
| Token not saving | Check localStorage | Clear browser cache (Ctrl+Shift+Delete) |
| 401 Unauthorized | Check token exists | Re-login if token expired |
| `npm: command not found` | Is Node.js installed? | Install Node.js from nodejs.org |
| `mvn: command not found` | Is Maven installed? | Install Maven, add to PATH |
| Vite won't serve | Dependencies missing? | Run `npm install` in frontend directory |

---

## 🛑 Proper Shutdown

### Stop Services Gracefully
- [ ] Backend: Press `Ctrl+C` in Terminal 1
- [ ] Frontend: Press `Ctrl+C` in Terminal 2
- [ ] Admin: Press `Ctrl+C` in Terminal 3

### Verify Ports Are Free
```bash
netstat -ano | findstr :8080   # Should be empty
netstat -ano | findstr :5173   # Should be empty
netstat -ano | findstr :5174   # Should be empty
```

---

## 📊 Performance Checks

### Response Time
- [ ] Backend API responds in < 100ms
- [ ] Frontend loads in < 2 seconds
- [ ] Login takes < 1 second

### No Memory Leaks
- [ ] Backend memory stable (check Task Manager)
- [ ] Frontend memory stable (DevTools → Memory)
- [ ] After 1 hour of testing, no growth

### No Error Messages
- [ ] Backend logs: no ERROR or EXCEPTION
- [ ] Browser console: no red errors
- [ ] Network tab: no failed requests (404, 500)

---

## ✨ Feature Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Login returns token
- [ ] Token persists on refresh
- [ ] Protected routes accessible with token
- [ ] 401 error redirects to login

### UI/UX
- [ ] Homepage loads without errors
- [ ] Can view food list
- [ ] Can search/filter foods
- [ ] Can add to cart
- [ ] Cart updates correctly

### Cart & Orders
- [ ] Add items to cart
- [ ] Quantity changes work
- [ ] Remove items works
- [ ] Checkout process works
- [ ] Order confirmation shows

### Backend APIs
- [ ] GET /api/foods - Returns food list
- [ ] POST /api/register - Creates user
- [ ] POST /api/login - Returns token
- [ ] POST /api/cart - Adds item
- [ ] GET /api/orders - Returns orders

---

## 📚 Documentation Reference

Access these files for detailed information:
1. [ ] **QUICK_START.md** - Quick reference guide
2. [ ] **AUTHENTICATION_GUIDE.md** - Auth system details
3. [ ] **LOCAL_DEPLOYMENT_GUIDE.md** - Full setup guide
4. [ ] Console logs - Real-time debugging

---

## 🎉 Success Indicators

All of these should be true:
- [ ] All 3 services started without errors
- [ ] Backend health check returns UP
- [ ] Frontend loads in browser
- [ ] User can register and login
- [ ] Token is stored and sent with requests
- [ ] Protected routes are accessible after login
- [ ] No CORS errors in console
- [ ] No 500 errors from backend
- [ ] Network requests show Authorization header
- [ ] Can navigate all pages

---

## 📝 Next Steps After Successful Verification

1. [ ] Review AUTHENTICATION_GUIDE.md
2. [ ] Explore the codebase
3. [ ] Test additional features
4. [ ] Plan enhancements
5. [ ] Deploy to production (follow DEPLOYMENT_CHECKLIST.md)

---

**✅ Setup Complete! Your local development environment is ready to test.**

**🎯 Start with the Quick Start above, then refer to detailed guides as needed.**

**⏱️ Typical setup time: 5-10 minutes**
