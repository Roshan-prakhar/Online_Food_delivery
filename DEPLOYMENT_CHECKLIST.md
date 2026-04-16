# 🚀 Foodies API Deployment Checklist

## **📋 Pre-Deployment Checklist**

### **✅ Code Preparation**
- [ ] Remove duplicate service files
- [ ] Update render.yaml for Neon DB
- [ ] Remove Razorpay dependencies
- [ ] Add dummy payment gateway
- [ ] Update .env files
- [ ] Test local build (if possible)

### **✅ External Services Setup**
- [ ] Create Neon PostgreSQL account
- [ ] Create Neon project "foodies-db"
- [ ] Create Neon database "foodies"
- [ ] Get Neon connection details
- [ ] Create Cloudflare R2 account
- [ ] Create Cloudflare bucket "foodies-images"
- [ ] Get Cloudflare R2 credentials

### **✅ Environment Variables Ready**
- [ ] DATABASE_URL (from Neon)
- [ ] DB_USERNAME (from Neon)
- [ ] DB_PASSWORD (from Neon)
- [ ] CLOUDFLARE_ACCESS_KEY (from Cloudflare)
- [ ] CLOUDFLARE_SECRET_KEY (from Cloudflare)
- [ ] CLOUDFLARE_R2_ENDPOINT (from Cloudflare)
- [ ] CLOUDFLARE_BUCKET_NAME (from Cloudflare)
- [ ] JWT_SECRET (already configured)

---

## **🚀 Deployment Steps**

### **Step 1: Neon PostgreSQL Setup**
1. **Go to [neon.tech](https://neon.tech)**
2. **Sign up with GitHub**
3. **Create new project**: `foodies-db`
4. **Create database**: `foodies`
5. **Get connection details**:
   ```bash
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/foodies?sslmode=require
   DB_USERNAME=username
   DB_PASSWORD=password
   ```

### **Step 2: Cloudflare R2 Setup**
1. **Go to [cloudflare.com](https://cloudflare.com)**
2. **Navigate to R2 Object Storage**
3. **Create bucket**: `foodies-images`
4. **Get API credentials**:
   ```bash
   CLOUDFLARE_ACCESS_KEY=your_access_key_id
   CLOUDFLARE_SECRET_KEY=your_secret_access_key
   CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
   CLOUDFLARE_BUCKET_NAME=foodies-images
   ```

### **Step 3: Deploy to Render**
1. **Go to [render.com](https://render.com)**
2. **Sign in with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your repository**
5. **Auto-detects render.yaml**
6. **Click "Create Web Service"**
7. **Wait for deployment** (5-10 minutes)

### **Step 4: Add Environment Variables in Render**
1. **Go to your service** → **"Environment" tab**
2. **Add all variables** from .env.deployment:
   - DATABASE_URL
   - DB_USERNAME
   - DB_PASSWORD
   - CLOUDFLARE_ACCESS_KEY
   - CLOUDFLARE_SECRET_KEY
   - CLOUDFLARE_R2_ENDPOINT
   - CLOUDFLARE_BUCKET_NAME
3. **JWT_SECRET is already configured**

### **Step 5: Restart Service**
1. **Click "Manual Deploy"** → **"Deploy Latest Commit"**
2. **Wait for restart**
3. **Monitor logs** for successful startup

---

## **🧪 Post-Deployment Testing**

### **✅ Health Checks**
- [ ] Test health endpoint: `GET /actuator/health`
- [ ] Should return: `{"status": "UP"}`

### **✅ Database Connection**
- [ ] Test user registration: `POST /api/auth/register`
- [ ] Test user login: `POST /api/auth/login`
- [ ] Check Neon dashboard for connections

### **✅ File Upload**
- [ ] Test food creation with image: `POST /api/foods`
- [ ] Check Cloudflare R2 bucket for uploaded files
- [ ] Test image retrieval

### **✅ Order Processing**
- [ ] Test order creation: `POST /api/orders/create`
- [ ] Test dummy payment: `POST /api/payments/process`
- [ ] Check order status updates

### **✅ Admin Panel Integration**
- [ ] Test admin login
- [ ] Test order management
- [ ] Test food management

---

## **🔍 Troubleshooting Guide**

### **❌ Common Issues & Solutions**

#### **Build Failed**
- **Check**: render.yaml syntax
- **Fix**: Validate YAML formatting
- **Log**: Check Render build logs

#### **Database Connection Failed**
- **Check**: Neon credentials
- **Fix**: Verify connection string format
- **Test**: Use psql client to connect

#### **Image Upload Failed**
- **Check**: Cloudflare R2 credentials
- **Fix**: Verify bucket permissions
- **Test**: Check bucket exists and is accessible

#### **Payment Processing Failed**
- **Check**: Dummy payment service
- **Fix**: Verify service implementation
- **Test**: Check payment endpoint responses

#### **404 Errors**
- **Check**: API endpoint paths
- **Fix**: Verify controller mappings
- **Test**: Use correct API URLs

---

## **📊 Performance Monitoring**

### **✅ Neon Dashboard**
- Monitor active connections
- Check query performance
- Track storage usage
- Monitor branch operations

### **✅ Render Dashboard**
- Monitor service health
- Check response times
- Track resource usage
- Review error logs

### **✅ Cloudflare Dashboard**
- Monitor storage usage
- Track download counts
- Check API requests
- Review bandwidth usage

---

## **🎯 Success Criteria**

### **✅ Deployment Success**
- [ ] Service is running on Render
- [ ] Health check passes
- [ ] Database connects successfully
- [ ] File uploads work
- [ ] Payment processing works
- [ ] Admin panel integrates

### **✅ Performance Metrics**
- [ ] Response time < 2 seconds
- [ ] Database queries optimized
- [ ] File uploads < 5 seconds
- [ ] No memory leaks
- [ ] Error rate < 1%

---

## **📚 Documentation Links**

### **🐘 Neon PostgreSQL**
- [Neon Dashboard](https://neon.tech)
- [Connection Guide](https://neon.tech/docs/connect/connect)
- [Best Practices](https://neon.tech/docs/manage/best-practices)

### **☁️ Cloudflare R2**
- [R2 Dashboard](https://cloudflare.com)
- [API Documentation](https://developers.cloudflare.com/r2/)
- [S3 Compatibility](https://developers.cloudflare.com/r2/api/s3-compatibility/)

### **🚀 Render**
- [Render Dashboard](https://render.com)
- [Deployment Guide](https://render.com/docs/deploy-node-express)
- [Environment Variables](https://render.com/docs/env-vars)

---

## **🎉 Deployment Complete!**

### **✅ What You Have**
- **Production-ready API**: `https://foodies-api.onrender.com/api`
- **PostgreSQL database**: Neon serverless
- **Image storage**: Cloudflare R2
- **Payment system**: Dummy gateway
- **Admin integration**: Full management

### **✅ Next Steps**
- Deploy admin panel to Render
- Deploy customer app to Netlify
- Test full integration
- Monitor performance
- Scale as needed

**🚀 Your food delivery API is production-ready!**
