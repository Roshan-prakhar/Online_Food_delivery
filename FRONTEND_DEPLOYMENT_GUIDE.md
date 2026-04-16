# 🚀 Frontend Deployment Guide

## **📋 Overview**

This guide covers the deployment of both frontend applications for the Foodies project:
- **Customer App** (`foodies`) - React app for food ordering
- **Admin Panel** (`adminpanel`) - React app for restaurant management

---

## **🔧 Configuration Applied**

### **✅ Customer App (foodies)**

#### **1. API Configuration:**
```javascript
// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
export const AUTH_API_URL = `${API_BASE_URL}`;
export const FOOD_API_URL = `${API_BASE_URL}/foods`;
export const CART_API_URL = `${API_BASE_URL}/cart`;
export const ORDER_API_URL = `${API_BASE_URL}/orders`;
export const PAYMENT_API_URL = `${API_BASE_URL}/payments`;
```

#### **2. Environment Variables:**
```bash
# .env.production
VITE_API_URL=https://foodies-api.onrender.com/api
VITE_APP_NAME=Foodies
VITE_PAYMENT_MODE=dummy
```

#### **3. Render Configuration:**
```yaml
# render.yaml
services:
  - type: web
    name: foodies-customer
    env: static
    buildCommand: "npm run build"
    publishDir: dist
    healthCheckPath: /
```

#### **4. Dependencies Updated:**
- ✅ Removed `razorpay` dependency
- ✅ Added dummy payment service
- ✅ All services use centralized API config

---

### **✅ Admin Panel (adminpanel)**

#### **1. API Configuration:**
```javascript
// src/config/api.js (already configured)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

#### **2. Environment Variables:**
```bash
# .env.production
VITE_API_URL=https://foodies-api.onrender.com/api
VITE_APP_NAME=Foodies Admin
```

#### **3. Render Configuration:**
```yaml
# render.yaml (updated to static)
services:
  - type: web
    name: foodies-admin
    env: static
    buildCommand: "npm run build"
    publishDir: dist
    healthCheckPath: /
```

---

## **🌐 API Endpoints Used**

### **Customer App Endpoints:**
```javascript
// Authentication
POST /api/register
POST /api/login

// Food Management
GET /api/foods
GET /api/foods/:id

// Cart Management
POST /api/cart
POST /api/cart/remove
GET /api/cart
DELETE /api/cart

// Order Management
GET /api/orders
POST /api/orders/create
POST /api/orders/verify
DELETE /api/orders/:id

// Payment (Dummy)
POST /api/payments/create-order
POST /api/payments/process
GET /api/payments/methods
POST /api/payments/simulate-failure
```

### **Admin Panel Endpoints:**
```javascript
// Food Management
GET /api/foods
POST /api/foods
PUT /api/foods/:id
DELETE /api/foods/:id

// Order Management
GET /api/orders/all
PATCH /api/orders/status/:id
```

---

## **🚀 Deployment Steps**

### **Step 1: Update API URL**
Both apps are configured to use:
```
https://foodies-api.onrender.com/api
```

### **Step 2: Deploy to Render**

#### **Customer App:**
1. Push changes to GitHub
2. Connect `foodies` repository to Render
3. Render will build and deploy automatically

#### **Admin Panel:**
1. Push changes to GitHub  
2. Connect `adminpanel` repository to Render
3. Render will build and deploy automatically

### **Step 3: Environment Variables**
Render will automatically set:
- `VITE_API_URL=https://foodies-api.onrender.com/api`
- `VITE_APP_NAME` (Foodies/Foodies Admin)
- `VITE_PAYMENT_MODE=dummy` (customer app)

---

## **🎯 Features Configured**

### **✅ Customer App Features:**
- **Dummy Payment Gateway** - No real payment processing
- **Environment-based API URLs** - Local vs Production
- **Responsive Design** - Bootstrap 5
- **Toast Notifications** - react-toastify
- **Router Navigation** - react-router-dom

### **✅ Admin Panel Features:**
- **Order Management** - View and update order status
- **Food Management** - Add/edit/delete food items
- **Environment-based API URLs** - Local vs Production
- **Responsive Design** - Bootstrap 5
- **Real-time Updates** - Polling for new orders

---

## **🔍 Testing Checklist**

### **Before Deployment:**
- [ ] API URLs point to correct backend
- [ ] Dummy payment flow works
- [ ] All services use centralized config
- [ ] Environment variables are set
- [ ] Build process completes successfully

### **After Deployment:**
- [ ] Apps load correctly on Render
- [ ] API calls work with backend
- [ ] Dummy payment processes correctly
- [ ] Admin panel can manage orders
- [ ] Customer app can place orders

---

## **📱 URLs After Deployment**

### **Expected URLs:**
- **Customer App**: `https://foodies-customer.onrender.com`
- **Admin Panel**: `https://foodies-admin.onrender.com`
- **Backend API**: `https://foodies-api.onrender.com/api`

### **Health Check Endpoints:**
- **Customer App**: `https://foodies-customer.onrender.com/`
- **Admin Panel**: `https://foodies-admin.onrender.com/`
- **Backend API**: `https://foodies-api.onrender.com/api/actuator/health`

---

## **🎉 Ready for Production**

### **✅ Configuration Complete:**
- Both frontend apps configured for production
- API endpoints properly connected
- Dummy payment system integrated
- Environment variables set
- Render deployment files ready

### **✅ Next Steps:**
1. Deploy backend API to Render
2. Deploy frontend apps to Render
3. Test complete system integration
4. Monitor application performance

**🚀 Your frontend applications are now configured and ready for deployment!**
