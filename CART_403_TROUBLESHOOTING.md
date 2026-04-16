# 🚨 Cart 403 Forbidden - Troubleshooting Guide

## **❌ Problem Identified:**

### **🔍 Error:**
```
Error while fetching the cart data
Request failed with status code 403
```

### **🎯 Root Cause:**
- **JWT authentication failing** for `/api/cart` endpoint
- **Spring Security blocking** the request
- **Token not being validated** properly

---

## **🔍 Debug Logging Added:**

### **✅ Frontend StoreContext:**
```javascript
console.log("StoreContext - Starting data load...");
console.log("StoreContext - Token from localStorage:", storedToken ? storedToken.substring(0, 20) + "..." : "null");
console.log("StoreContext - Loading cart data with token:", token ? token.substring(0, 20) + "..." : "null");
console.log("StoreContext - Cart data loaded successfully:", items);
```

### **✅ Frontend Cart Service:**
```javascript
console.log("Cart Service - Getting cart data");
console.log("Cart Service - Token:", token ? token.substring(0, 20) + "..." : "null");
console.log("Cart Service - API URL:", CART_API_URL);
console.log("Cart Service - Get cart successful:", response.status);
```

### **✅ Backend JWT Filter:**
```java
System.out.println("JWT Filter - Request URI: " + request.getRequestURI());
System.out.println("JWT Filter - Auth Header (Authorization): " + authHeader);
System.out.println("JWT Filter - Auth Header (authorization): " + authHeaderLower);
System.out.println("JWT Filter - Final Auth Header: " + finalAuthHeader);
System.out.println("JWT Filter - Token extracted: " + token.substring(0, 20) + "...");
System.out.println("JWT Filter - Email extracted: " + email);
```

---

## **🔍 Step-by-Step Troubleshooting:**

### **📋 Step 1: Check Frontend Console**
1. **Open browser console** (F12)
2. **Refresh the page**
3. **Look for these logs in order:**
   ```
   StoreContext - Starting data load...
   StoreContext - Token from localStorage: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   StoreContext - Loading cart data with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Cart Service - Getting cart data
   Cart Service - Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Cart Service - API URL: https://swito-1.onrender.com/api/cart
   ```

### **📋 Step 2: Check Backend Logs**
1. **Go to Render dashboard** → Logs
2. **Look for these logs:**
   ```
   JWT Filter - Request URI: /api/cart
   JWT Filter - Auth Header (Authorization): Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT Filter - Token extracted: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT Filter - Email extracted: user@example.com
   JWT Filter - Authentication set successfully
   ```

---

## **🚨 Common Issues & Solutions:**

### **❌ Issue 1: No Token in Frontend**
```bash
# Console shows:
StoreContext - Token from localStorage: null
StoreContext - No token found, skipping cart load

# Solution: User needs to login first
# - Check if user is logged in
# - Check localStorage for token
# - Redirect to login if no token
```

### **❌ Issue 2: Token Not Sent to Backend**
```bash
# Frontend shows token but backend shows:
JWT Filter - No valid Authorization header found

# Solution: Check if token is being passed correctly
# - Check cartService.js token parameter
# - Verify Authorization header format
# - Check CORS configuration
```

### **❌ Issue 3: Token Invalid/Expired**
```bash
# Backend logs show:
JWT Filter - Token validation failed

# Solution: Token is invalid or expired
# - Check JWT secret matches between login and validation
# - Check token expiration (10 hours)
# - User needs to login again
```

### **❌ Issue 4: User Not Found**
```bash
# Backend logs show:
JWT Filter - Email extracted: user@example.com
# But then UserDetailsService fails

# Solution: User loading issue
# - Check if user exists in database
# - Check UserDetailsService implementation
# - Verify email format in token
```

---

## **🔧 Quick Fixes:**

### **✅ Fix 1: Verify Token in Browser**
```javascript
// In browser console
console.log("Token:", localStorage.getItem("token"));
console.log("Token length:", localStorage.getItem("token")?.length);
```

### **✅ Fix 2: Test Token Validity**
```javascript
// Test if token format looks correct
const token = localStorage.getItem("token");
if (token && token.split('.').length === 3) {
    console.log("Token format looks correct (3 parts)");
} else {
    console.log("Token format is invalid");
}
```

### **✅ Fix 3: Manual API Test**
```bash
# Test the cart endpoint manually
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://swito-1.onrender.com/api/cart
```

---

## **🔄 Expected Working Flow:**

### **✅ Frontend Console:**
```
StoreContext - Starting data load...
StoreContext - Token from localStorage: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
StoreContext - Loading cart data with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Cart Service - Getting cart data
Cart Service - Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Cart Service - API URL: https://swito-1.onrender.com/api/cart
Cart Service - Get cart successful: 200
StoreContext - Cart data loaded successfully: {1: 2, 3: 1}
```

### **✅ Backend Logs:**
```
JWT Filter - Request URI: /api/cart
JWT Filter - Auth Header (Authorization): Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT Filter - Token extracted: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT Filter - Email extracted: user@example.com
JWT Filter - User loaded: user@example.com
JWT Filter - Authentication set successfully
```

---

## **🚀 Next Steps:**

### **🔧 Deploy Debug Version:**
```bash
git add .
git commit -m "Add comprehensive cart authentication debug logging"
git push origin main  # Frontend
git push origin backend  # Backend
```

### **📋 Test and Analyze:**
1. **Deploy both frontend and backend**
2. **Clear browser cache and refresh**
3. **Login to get a fresh token**
4. **Check console logs step by step**
5. **Check backend logs**
6. **Identify exact failure point**

---

## **🎯 Most Likely Issues:**

### **🚨 Issue A: Token Not in localStorage**
- **User not logged in** or token cleared
- **Solution**: Login again

### **🚨 Issue B: Token Expired**
- **Token older than 10 hours**
- **Solution**: Login again

### **🚨 Issue C: JWT Secret Mismatch**
- **Different JWT secrets** in login vs validation
- **Solution**: Ensure same JWT_SECRET environment variable

### **🚨 Issue D: Authorization Header Not Sent**
- **CORS or network issue** blocking header
- **Solution**: Check CORS configuration

---

## **🎉 Solution Ready:**

### **✅ Debug Tools Added:**
- **Frontend token tracking** from localStorage to API call
- **Backend JWT processing** logging
- **Error handling** with fallback to empty cart
- **Step-by-step troubleshooting** guide

### **✅ Next Action:**
1. **Deploy debug versions**
2. **Test with fresh login**
3. **Analyze console logs**
4. **Check backend logs**
5. **Fix identified issue**

**🚀 Deploy this debug version and we'll pinpoint exactly where the JWT authentication is failing for the cart endpoint!**
