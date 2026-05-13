# 📁 .env Files Guide for Foodies API

## **🗂️ Available .env Files**

### **1. `.env` - Original Configuration**
```bash
# Original file with Razorpay (deprecated)
# Contains old Razorpay configuration
# Not recommended for current deployment
```

### **2. `.env.updated` - Simplified Version**
```bash
# Simplified version without Razorpay
# Basic configuration for testing
# Missing Neon PostgreSQL setup
```

### **3. `.env.neon` - Neon PostgreSQL Version**
```bash
# Configured specifically for Neon PostgreSQL
# Includes Neon connection string format
# Good reference for Neon setup
```

### **4. `.env.deployment` - ✅ FINAL DEPLOYMENT VERSION**
```bash
# 🚀 THIS IS THE FILE TO USE FOR DEPLOYMENT
# Complete configuration with all services
# Step-by-step instructions included
# Production-ready setup
```

---

## **🎯 Which .env File to Use?**

### **✅ For Production Deployment:**
**Use `.env.deployment`** - This is the complete, production-ready configuration

### **📚 For Reference:**
- `.env.neon` - Neon PostgreSQL setup guide
- `.env.updated` - Simple configuration reference
- `.env` - Original configuration (deprecated)

---

## **🚀 Quick Start with .env.deployment**

### **Step 1: Copy the Configuration**
```bash
# Copy from .env.deployment to your environment
# Or use it as reference for Render environment variables
```

### **Step 2: Replace Placeholders**
```bash
# Replace these with your actual values:
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@ep-xxx-xxx.us-east-1.aws.neon.tech/foodies?sslmode=require
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD

CLOUDFLARE_ACCESS_KEY=YOUR_ACCESS_KEY
CLOUDFLARE_SECRET_KEY=YOUR_SECRET_KEY
CLOUDFLARE_R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET_NAME=foodies-images
```

### **Step 3: Add to Render**
```bash
# In Render dashboard → Environment tab:
# Add all the variables from .env.deployment
# JWT_SECRET is already configured in render.yaml
```

---

## **🔧 Environment Variables Breakdown**

### **🐘 Neon PostgreSQL Variables**
```bash
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
DB_USERNAME=username
DB_PASSWORD=password
```

**How to get these:**
1. Go to [neon.tech](https://neon.tech)
2. Create project "foodies-db"
3. Create database "foodies"
4. Copy connection string from Dashboard

### **☁️ Cloudflare R2 Variables**
```bash
CLOUDFLARE_ACCESS_KEY=your_access_key_id
CLOUDFLARE_SECRET_KEY=your_secret_access_key
CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET_NAME=foodies-images
```

**How to get these:**
1. Go to [cloudflare.com](https://cloudflare.com)
2. Navigate to R2 Object Storage
3. Create bucket "foodies-images"
4. Get API credentials from R2 API tokens

### **🔐 JWT Authentication**
```bash
JWT_SECRET=<your_64_char_random_hex_secret>
```
**Already configured in render.yaml** - no action needed

---

## **📋 Deployment Checklist**

### **✅ Before Deployment:**
- [ ] Create Neon account and get credentials
- [ ] Create Cloudflare R2 account and get credentials
- [ ] Copy values from .env.deployment
- [ ] Update placeholder values with actual credentials

### **✅ In Render Dashboard:**
- [ ] Deploy API to Render
- [ ] Go to Environment tab
- [ ] Add all environment variables from .env.deployment
- [ ] Restart service

### **✅ After Deployment:**
- [ ] Test health endpoint: `/actuator/health`
- [ ] Test database connection
- [ ] Test image upload
- [ ] Test payment processing

---

## **🔍 Troubleshooting .env Issues**

### **❌ Common Problems:**

#### **Database Connection Failed**
```bash
# Check if:
# - DATABASE_URL is correct format
# - DB_USERNAME and DB_PASSWORD match
# - SSL mode is set to 'require'
# - Neon database exists
```

#### **Cloudflare R2 Failed**
```bash
# Check if:
# - Access keys are correct
# - Bucket name matches exactly
# - Endpoint URL is correct format
# - Bucket permissions allow access
```

#### **Build Failed**
```bash
# Check if:
# - All required variables are set
# - No syntax errors in values
# - Special characters are properly escaped
```

---

## **💡 Pro Tips**

### **🔒 Security:**
- Never commit .env files to Git
- Use strong, unique passwords
- Rotate credentials regularly
- Use different keys for different services

### **🚀 Performance:**
- Use Neon's connection pooling
- Optimize database queries
- Monitor storage usage
- Use Cloudflare CDN for images

### **💰 Cost Management:**
- Monitor Neon storage usage (3GB free)
- Track Cloudflare storage (10GB free)
- Watch Render compute hours (750 free)
- Set up alerts for usage limits

---

## **🎉 Ready for Production!**

### **✅ Your Setup Includes:**
- **Neon PostgreSQL**: Professional database
- **Cloudflare R2**: Image storage
- **Dummy Payment**: Complete payment flow
- **JWT Authentication**: Secure user management
- **Render Deployment**: Production hosting

### **✅ Final URL:**
```
https://foodies-api.onrender.com/api
```

**🚀 Use `.env.deployment` as your guide and you'll have a production-ready food delivery API!**
