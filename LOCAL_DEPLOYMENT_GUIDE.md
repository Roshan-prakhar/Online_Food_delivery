# Local Development Setup & Deployment Guide

## 📋 Overview
This guide covers setting up and running the Foodies application locally with all three components:
- **Backend API**: Spring Boot (Port 8080)
- **Frontend**: React/Vite (Port 5173)
- **Admin Panel**: React/Vite (Port 5174)

---

## 🛠️ Prerequisites

### System Requirements
- **Java 21** or higher - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/download/)
- **Git**

### Verify Installations
```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check Node.js
node -v
npm -v

# Check PostgreSQL
psql --version
```

---

## 📦 Environment Setup

### 1. Database Setup (PostgreSQL)

#### Windows Command Prompt:
```cmd
# Start PostgreSQL service (if not running)
# Services app > Locate PostgreSQL > Start

# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE foodies;

# Verify
\l
# You should see "foodies" in the list
```

#### Linux/Mac:
```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Connect
psql -U postgres

# Create database
CREATE DATABASE foodies;

# Verify
\l
```

### 2. Verify Database Connection
```bash
psql -U postgres -d foodies -c "SELECT 1;"
# Expected: Should return 1 without errors
```

### 3. Backend Environment Variables
The `.env.local` file in `foodiesapi/` is already configured for:
- Database: `localhost:5432/foodies`
- User: `postgres`
- Password: `password`

**If your PostgreSQL password is different, update:**
```
foodiesapi/.env.local
→ Change DB_PASSWORD=password to your actual password
```

### 4. Frontend Environment Variables
Already configured for local development:
- **Frontend** (`foodies/.env.local`): `VITE_API_URL=http://localhost:8080/api`
- **Admin** (`adminpanel/.env.local`): `VITE_API_URL=http://localhost:8080/api`

---

## 🚀 Quick Start (Choose ONE method)

### Method A: Using Provided Scripts (Recommended)

#### Windows Users:
Open **3 separate Command Prompts** in the project root:

**Terminal 1 - Backend:**
```cmd
start-backend.bat
```

**Terminal 2 - Frontend:**
```cmd
start-frontend.bat
```

**Terminal 3 - Admin Panel (Optional):**
```cmd
start-admin.bat
```

#### Linux/Mac Users:
Open **3 separate terminals** in the project root:

**Terminal 1 - Backend:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
npm run dev -w foodies
```

**Terminal 3 - Admin Panel (Optional):**
```bash
npm run dev -w adminpanel -- --port 5174
```

---

### Method B: Manual Steps

#### Step 1: Start Backend
```bash
cd foodiesapi
mvn spring-boot:run
```
**Expected Output:**
```
2024-XX-XX... Started FoodiesapiApplication in X.XXX seconds
```
Backend will be available at: `http://localhost:8080`

#### Step 2: Start Frontend (in a new terminal)
```bash
cd foodies
npm install  # Only needed if node_modules doesn't exist
npm run dev
```
**Expected Output:**
```
VITE v4.4.5 running at:
➜  Local:   http://localhost:5173/
```
Frontend will be available at: `http://localhost:5173`

#### Step 3: Start Admin Panel (optional, in a new terminal)
```bash
cd adminpanel
npm install  # Only needed if node_modules doesn't exist
npm run dev -- --port 5174
```
Admin panel will be available at: `http://localhost:5174`

---

## ✅ Verification Checklist

### 1. Backend Health Check
```bash
curl http://localhost:8080/actuator/health
```
Expected: `{"status":"UP"}`

### 2. Test Authentication
```bash
# Register
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### 3. Frontend Access
- Open browser: `http://localhost:5173`
- You should see the Foodies homepage
- Try to register/login
- Check browser console for errors

### 4. Admin Panel Access (if started)
- Open browser: `http://localhost:5174`
- You should see the admin panel
- Test authentication flow

---

## 🔍 Troubleshooting

### Issue: "Port 8080 already in use"
```bash
# Find process using port 8080
netstat -ano | findstr :8080  # Windows
lsof -i :8080  # Mac/Linux

# Kill the process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # Mac/Linux
```

### Issue: "PostgreSQL connection refused"
```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# If not running:
# Windows: Services app > Start PostgreSQL service
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql
```

### Issue: "Database 'foodies' does not exist"
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE foodies;
```

### Issue: "Maven not found"
```bash
# Add Maven to PATH or use full path
# Windows: Set environment variable MAVEN_HOME
# Mac/Linux: brew install maven
```

### Issue: "npm not found"
```bash
# Install Node.js from https://nodejs.org/
# Verify: node -v && npm -v
```

### Issue: Frontend can't connect to backend (401 or CORS error)
```javascript
// Open browser console and check:
localStorage.getItem('token')  // Should show JWT token after login

// Check axios headers:
axios.defaults.headers.common['Authorization']  // Should show Bearer token
```

**Solution**:
1. Verify backend is running: `http://localhost:8080/actuator/health`
2. Check `.env.local` has correct API URL
3. Clear browser cache: Ctrl+Shift+Delete

### Issue: "CORS error" when making requests
This means the frontend is not in the allowed origins. Update `SecurityConfig.java`:
```java
config.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",  // Frontend
    "http://localhost:5174",  // Admin
    // ... other origins
));
```

---

## 📊 Project Structure
```
online-food-delivery-project/
├── foodiesapi/              # Spring Boot Backend
│   ├── src/main/java/
│   ├── pom.xml
│   └── .env.local
├── foodies/                 # React Frontend
│   ├── src/
│   ├── package.json
│   └── .env.local
├── adminpanel/              # React Admin Panel
│   ├── src/
│   ├── package.json
│   └── .env.local
├── start-backend.bat        # Windows backend starter
├── start-frontend.bat       # Windows frontend starter
├── start-admin.bat          # Windows admin starter
├── start-backend.sh         # Unix backend starter
└── AUTHENTICATION_GUIDE.md  # Auth documentation
```

---

## 🔐 Authentication Testing Flow

1. **Register**: `http://localhost:5173/register`
   - Fill in email, password, name
   - Click "Sign up"

2. **Login**: `http://localhost:5173/login`
   - Use credentials from step 1
   - Click "Sign in"
   - Check `localStorage` has token

3. **Protected Routes**:
   - `/cart` - Should now be accessible
   - `/order` - Should now be accessible
   - `/myorders` - Should now be accessible

4. **Token Verification**:
   ```javascript
   // In browser console:
   localStorage.getItem('token')
   axios.defaults.headers.common['Authorization']
   ```

---

## 📝 Development Tips

### 1. Hot Reload
Both React apps support hot reload. Simply save your files and changes appear instantly.

### 2. Backend Logs
Watch the backend terminal for request logs:
```
JWT Filter - Request URI: /api/login
JWT Filter - Auth Header: Bearer eyJhbGc...
JWT Util - Token username: test@example.com
```

### 3. Frontend Console Logs
Open browser developer tools (F12 or Ctrl+Shift+I) to see:
- API request details
- Token storage logs
- Component render information

### 4. Stop Services
- **Backend**: Press `Ctrl+C` in terminal
- **Frontend**: Press `Ctrl+C` in terminal
- **Admin**: Press `Ctrl+C` in terminal

---

## 🚢 Build for Production

### Build Backend
```bash
cd foodiesapi
mvn clean package
java -jar target/foodiesapi-0.0.1-SNAPSHOT.jar
```

### Build Frontend
```bash
cd foodies
npm run build
# Output: dist/ folder
```

### Build Admin Panel
```bash
cd adminpanel
npm run build
# Output: dist/ folder
```

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [JWT Authentication](https://jwt.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console logs (F12)
3. Check backend terminal output
4. Verify all prerequisites are installed
5. Ensure ports 5173, 5174, 8080 are available
6. Check file permissions on startup scripts (Unix users may need `chmod +x`)

---

## ✨ Next Steps After Successful Setup

1. **Test Authentication**: Follow the authentication testing flow
2. **Explore UI**: Navigate through different pages
3. **Check Console Logs**: Monitor backend and frontend logs
4. **Review Code**: Understand the JWT authentication implementation
5. **Deploy**: When ready, follow deployment guides for production

Happy developing! 🎉
