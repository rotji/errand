# Deployment Guide

This guide covers deploying the Errand application with the following architecture:
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas

## Architecture Overview

```
Frontend (Netlify) → Backend (Render) → Database (MongoDB Atlas)
```

## Backend Deployment (Render)

### 1. Prerequisites
- GitHub repository with your backend code
- MongoDB Atlas database set up
- Render account

### 2. Deploy to Render

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

2. **Configure Service**
   - **Name**: `errand-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URL=your_mongodb_atlas_connection_string
   SERVER_MESSAGE=Welcome to Errand Platform Backend!
   FRONTEND_URL=https://your-netlify-site-name.netlify.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-service-name.onrender.com`

### 3. MongoDB Atlas Setup
Ensure your MongoDB Atlas cluster allows connections from:
- `0.0.0.0/0` (all IPs) for simplicity, or
- Add Render's IP ranges to your Atlas whitelist

## Frontend Deployment (Netlify)

### 1. Update Environment Variables
Before deploying, update your `.env` file:
```
VITE_API_BASE_URL=https://your-render-service-name.onrender.com
```

### 2. Deploy to Netlify

#### Option A: GitHub Integration
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `/` (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Option B: Manual Deploy
1. Build locally: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### 3. Set Environment Variables in Netlify
Go to Site Settings → Environment Variables and add:
```
VITE_API_BASE_URL=https://your-render-service-name.onrender.com
```

### 4. Configure Redirects (for React Router)
Create `public/_redirects` file:
```
/*    /index.html   200
```

## Post-Deployment Steps

### 1. Update CORS Settings
Ensure your backend's CORS is configured for your Netlify domain:
```javascript
// In backend/server.js - already configured
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL, // Your Netlify URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 2. Test the Application
1. Visit your Netlify URL
2. Test login/registration
3. Test task creation
4. Test agent functionality
5. Check real-time features (Socket.io)

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
SERVER_MESSAGE=Welcome to Errand Platform Backend!
FRONTEND_URL=https://your-netlify-site.netlify.app
```

### Frontend (Netlify)
```
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure FRONTEND_URL is set correctly in Render
   - Check that Netlify URL is in CORS origins

2. **Database Connection Issues**
   - Verify MONGODB_URL is correct
   - Check MongoDB Atlas IP whitelist
   - Ensure database user has proper permissions

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

4. **Socket.io Issues**
   - Render supports WebSockets by default
   - Check that client connects to correct backend URL

### Logs and Monitoring
- **Render**: View logs in Render dashboard
- **Netlify**: Check function logs and build logs
- **MongoDB**: Monitor connections in Atlas dashboard

## Development vs Production

### Local Development
```bash
# Backend
cd backend
npm run dev

# Frontend
npm run dev
```

### Production URLs
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-service.onrender.com`
- Database: MongoDB Atlas

## Security Notes

1. **Environment Variables**: Never commit .env files
2. **CORS**: Configure specific origins, not wildcards
3. **Database**: Use strong passwords and IP restrictions
4. **HTTPS**: Both Render and Netlify provide HTTPS by default

## Performance Optimization

1. **Render**: Use paid plans for zero cold starts
2. **Netlify**: Enable build optimizations
3. **MongoDB**: Use connection pooling and indexes
4. **Caching**: Implement Redis for session management (optional)