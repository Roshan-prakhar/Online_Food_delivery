# Authentication System - Complete Guide

## Overview
The project now has a complete JWT-based authentication system integrated across:
- **Backend**: Spring Boot API (foodiesapi)
- **Frontend**: React with Axios interceptors (foodies)
- **Admin Panel**: Separate React app (adminpanel)

## Architecture

### Backend (Spring Boot)
```
foodiesapi/
├── config/SecurityConfig.java       (JWT filter enabled, CORS configured)
├── controller/AuthController.java   (Login endpoint)
├── controller/UserController.java   (Register endpoint)
├── filters/JwtAuthenticationFilter.java (Token validation)
├── service/AppUserDetailsService.java   (User loading)
└── util/JwtUtil.java                (Token generation/validation)
```

### Frontend (React)
```
foodies/src/
├── service/authService.js           (Auth API calls + token storage)
├── config/axiosConfig.js            (Request/Response interceptors)
├── components/Login/Login.jsx       (Login form)
├── components/Register/Register.jsx (Register form)
└── main.jsx                         (Auth initialization)
```

## How Authentication Works

### 1. User Registration Flow
```
Client → POST /api/register → Backend
                              ├─ Validate input
                              ├─ Hash password
                              ├─ Save to DB
                              └─ Return success

Client receives status 201
```

### 2. User Login Flow
```
Client → POST /api/login (email, password) → Backend
                                            ├─ Authenticate credentials
                                            ├─ Generate JWT token
                                            └─ Return token + user email

Client
  ├─ Stores token in localStorage
  ├─ Updates axios default headers
  └─ Redirects to home page
```

### 3. Authenticated Request Flow
```
Client → GET /api/protected-endpoint → Axios Interceptor
                                      ├─ Retrieves token from localStorage
                                      ├─ Adds Authorization: Bearer <token>
                                      └─ Makes request

Backend → JwtAuthenticationFilter
         ├─ Extracts token from Authorization header
         ├─ Validates token signature & expiration
         ├─ Loads user from token claims
         └─ Allows request to proceed

Response → Client → Axios Interceptor
                   ├─ Checks status code
                   ├─ If 401, clears token & redirects to login
                   └─ Returns response
```

## Token Details
- **Algorithm**: HS256
- **Expiration**: 10 hours
- **Secret Key**: Stored in `application.properties` as `jwt.secret.key`
- **Claims**: User email as subject

## Testing Authentication

### Step 1: Register a New User
```bash
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Expected Response:
```json
{
  "id": 1,
  "email": "test@example.com",
  "firstName": "Test",
  "lastName": "User",
  "role": "USER"
}
```

### Step 2: Login with Credentials
```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

Expected Response:
```json
{
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzA0MTExMjAwLCJleHAiOjE3MDQxNDcyMDB9.SIGNATURE"
}
```

### Step 3: Use Token for Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/protected-endpoint \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzA0MTExMjAwLCJleHAiOjE3MDQxNDcyMDB9.SIGNATURE"
```

### Step 4: Test Frontend Authentication
1. Open browser console
2. Navigate to `http://localhost:5173` (or your frontend URL)
3. Click "Sign In"
4. Enter test credentials
5. Check localStorage:
   ```javascript
   localStorage.getItem('token')  // Should show JWT token
   ```
6. Check axios headers:
   ```javascript
   axios.defaults.headers.common['Authorization']  // Should show Bearer token
   ```

## File Changes Summary

### Backend Changes
- ✅ **SecurityConfig.java**: Enabled JWT authentication filter

### Frontend Changes
- ✅ **authService.js**: Added token storage, retrieval, and initialization functions
- ✅ **axiosConfig.js**: Created request/response interceptors
- ✅ **main.jsx**: Added axios config and auth initialization
- ℹ️ **Login.jsx**: Already functional, works with updated authService

## CORS Configuration
Allowed origins:
- `http://localhost:5173` (Frontend dev)
- `http://localhost:5174` (Admin panel dev)
- `https://swito-frontend.netlify.app` (Production frontend)
- `https://swito-1.onrender.com` (Production API)

## Public Endpoints (No Token Required)
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/foods/**` - View foods
- `GET /api/cart/**` - View cart (basic)
- `GET /api/orders/all` - View all orders
- `GET /api/orders/status/**` - Check order status
- `GET /api/payments/**` - Payment information

## Protected Endpoints (Token Required)
- `POST /api/cart/**` - Add/modify cart
- `DELETE /api/cart/**` - Remove from cart
- `POST /api/orders` - Place order
- Any custom protected endpoint

## Troubleshooting

### Issue: Token not being saved
**Solution**: Check browser console for errors, ensure localStorage is not cleared by privacy settings

### Issue: 401 Unauthorized on protected endpoints
**Solution**:
1. Verify token exists: `localStorage.getItem('token')`
2. Check token expiration: Expired tokens (10 hours) require re-login
3. Verify Authorization header: `axios.defaults.headers.common['Authorization']`

### Issue: CORS errors
**Solution**:
1. Ensure your frontend URL is in the allowed origins list in SecurityConfig
2. Check that headers are correct (Authorization, Content-Type)
3. Verify request includes Authorization header

### Issue: Login response doesn't include token
**Solution**: Verify backend is returning both `email` and `token` fields in response

## Environment Variables

### Backend (.env or application.properties)
```
JWT_SECRET=your-secret-key-here
DATABASE_URL=jdbc:postgresql://localhost:5432/foodies
DB_USERNAME=postgres
DB_PASSWORD=password
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## Next Steps
1. Test the complete authentication flow manually
2. Monitor browser console and backend logs for any issues
3. Verify protected endpoints require valid tokens
4. Check token expiration behavior after 10 hours
5. Test logout functionality (clear localStorage)
