# 🔧 JWT Authentication Troubleshooting Guide

## **❌ Problem: 403 Forbidden on Cart Endpoint**

### **🔍 Error:**
```
403 Forbidden on /api/cart
```

### **🎯 Root Cause Analysis:**
- **JWT Token not being processed** correctly
- **Spring Security blocking** protected endpoints
- **Authentication filter** may not be working

---

## **✅ Debug Logging Added:**

### **🔧 Backend JWT Filter:**
```java
// Added to JwtAuthenticationFilter.java
System.out.println("JWT Filter - Request URI: " + request.getRequestURI());
System.out.println("JWT Filter - Auth Header: " + authHeader);
System.out.println("JWT Filter - Token extracted: " + token.substring(0, 20) + "...");
System.out.println("JWT Filter - Email extracted: " + email);
System.out.println("JWT Filter - Authentication set successfully");
```

### **🔧 Frontend Cart Service:**
```javascript
// Added to cartService.js
console.log("Cart Service - Adding to cart:", foodId);
console.log("Cart Service - Token:", token ? token.substring(0, 20) + "..." : "null");
console.log("Cart Service - API URL:", CART_API_URL);
console.log("Cart Service - Add to cart successful:", response.status);
```

---

## **🔍 Troubleshooting Steps:**

### **📋 Step 1: Check Frontend Console**
1. **Open browser console** (F12)
2. **Try to add item to cart**
3. **Look for these logs:**
   ```
   Cart Service - Adding to cart: 123
   Cart Service - Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Cart Service - API URL: https://swito-1.onrender.com/api/cart
   ```

### **📋 Step 2: Check Backend Logs**
1. **Check Render dashboard** → Logs
2. **Look for these logs:**
   ```
   JWT Filter - Request URI: /api/cart
   JWT Filter - Auth Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT Filter - Token extracted: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT Filter - Email extracted: user@example.com
   JWT Filter - Authentication set successfully
   ```

---

## **🚨 Common Issues & Solutions:**

### **❌ Issue 1: No Token in Frontend**
```bash
# Console shows:
Cart Service - Token: null

# Solution: Check if user is logged in
# - Check localStorage for token
# - Check StoreContext token state
```

### **❌ Issue 2: Token Not Sent to Backend**
```bash
# Console shows token but backend logs show:
JWT Filter - No valid Authorization header found

# Solution: Check CORS headers
# - Verify CORS configuration
# - Check if Authorization header is blocked
```

### **❌ Issue 3: Token Invalid**
```bash
# Backend logs show:
JWT Filter - Token validation failed

# Solution: Check token generation
# - Verify JWT secret matches
# - Check token expiration
```

### **❌ Issue 4: User Not Found**
```bash
# Backend logs show:
JWT Filter - User loaded: user@example.com
# But then authentication fails

# Solution: Check user loading
# - Verify user exists in database
# - Check UserDetailsService implementation
```

---

## **🔧 Quick Fixes:**

### **✅ Fix 1: Verify Token Storage**
```javascript
// In browser console
console.log("Token in localStorage:", localStorage.getItem("token"));
console.log("Token in context:", token);
```

### **✅ Fix 2: Check Token Format**
```javascript
// Token should be: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
// Not: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **✅ Fix 3: Verify API URL**
```javascript
// Should be: https://swito-1.onrender.com/api/cart
// Not: https://swito-1.onrender.com/cart
```

---

## **🔄 Next Steps:**

### **🚀 Deploy Debug Version:**
```bash
git add .
git commit -m "Add JWT authentication debug logging"
git push origin backend
```

### **📋 Test and Analyze:**
1. **Deploy backend** with debug logging
2. **Deploy frontend** with debug logging
3. **Test cart functionality**
4. **Analyze logs** from both frontend and backend
5. **Identify exact failure point**

---

## **🎯 Expected Working Flow:**

### **✅ Frontend:**
```
Cart Service - Adding to cart: 123
Cart Service - Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Cart Service - API URL: https://swito-1.onrender.com/api/cart
Cart Service - Add to cart successful: 200
```

### **✅ Backend:**
```
JWT Filter - Request URI: /api/cart
JWT Filter - Auth Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT Filter - Token extracted: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT Filter - Email extracted: user@example.com
JWT Filter - User loaded: user@example.com
JWT Filter - Authentication set successfully
```

---

## **🔍 Debugging Checklist:**

### **✅ Frontend Verification:**
- [ ] Token exists in localStorage
- [ ] Token passed to cart service
- [ ] Authorization header sent correctly
- [ ] API URL is correct

### **✅ Backend Verification:**
- [ ] JWT filter receives request
- [ ] Authorization header present
- [ ] Token extracted successfully
- [ ] Email extracted from token
- [ ] User loaded successfully
- [ ] Token validation passes
- [ ] Authentication set in context

---

## **🎉 Solution Ready:**

### **✅ Debug Tools Added:**
- **Frontend logging** to track token flow
- **Backend logging** to track authentication
- **Error handling** to identify issues
- **Comprehensive troubleshooting** guide

### **✅ Next Action:**
1. **Deploy debug version**
2. **Test cart functionality**
3. **Analyze logs**
4. **Fix identified issue**
5. **Remove debug logs** once working

**🚀 Deploy this debug version and we'll identify exactly where the JWT authentication is failing!**
