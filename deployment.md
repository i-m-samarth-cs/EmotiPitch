# EmotiPitch Deployment Guide

Complete guide for deploying EmotiPitch to production using free hosting services.

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Render.com account (free tier)
- IBM Cloud account with watsonx.ai access (free Lite plan)

## Step 1: Get IBM watsonx.ai API Key

1. Go to [watsonx.ai](https://www.ibm.com/watsonx)
2. Sign up for a free Lite plan account
3. Create a new project
4. Navigate to **API Keys** section
5. Generate a new API key
6. Copy your:
   - API Key
   - Project ID
   - Service URL (usually `https://us-south.ml.cloud.ibm.com`)

## Step 2: Prepare Your Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - EmotiPitch hackathon project"
git branch -M main
git remote add origin https://github.com/yourusername/emotipitch.git
git push -u origin main
```

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Deploy:
```bash
vercel --prod
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **emotipitch**
   - Directory? **./frontend**
   - Override settings? **N**

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables (if needed):
   - `VITE_API_URL`: Your backend URL (add after backend deployment)
6. Click **Deploy**

Your frontend will be live at: `https://emotipitch.vercel.app`

## Step 4: Deploy Backend to Render.com

### Create Web Service

1. Go to [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `emotipitch-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free`

### Add Environment Variables

In Render dashboard, add these environment variables:

```
WATSONX_API_KEY=your_watsonx_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
FLASK_ENV=production
FLASK_DEBUG=False
PORT=5000
CORS_ORIGINS=https://emotipitch.vercel.app
```

### Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Your backend will be live at: `https://emotipitch-backend.onrender.com`

## Step 5: Update Frontend with Backend URL

1. Go back to Vercel dashboard
2. Navigate to your project → **Settings** → **Environment Variables**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://emotipitch-backend.onrender.com`
4. Redeploy frontend:
   - Go to **Deployments** tab
   - Click **...** on latest deployment
   - Click **Redeploy**

## Step 6: Update Frontend API Calls

If you hardcoded `/api` in your frontend, update to use environment variable:

```javascript
// In frontend/src/components/AIExplanation.jsx and CoachSimulation.jsx
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Update axios calls
const response = await axios.post(`${API_URL}/api/explain`, {
  // ... data
})
```

## Step 7: Test Your Deployment

1. Visit your Vercel URL: `https://emotipitch.vercel.app`
2. Test features:
   - ✅ Video loads correctly
   - ✅ Emotion detection works (camera permission)
   - ✅ AI explanations generate
   - ✅ Coach simulation works
   - ✅ Post-match emotion map displays

## Step 8: Optional - Custom Domain

### Vercel Custom Domain

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

### Render Custom Domain

1. Go to Render service → **Settings** → **Custom Domains**
2. Add your custom domain
3. Update DNS records as instructed

## Troubleshooting

### Frontend Issues

**Problem**: White screen on deployment
- **Solution**: Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check build logs in Vercel

**Problem**: API calls failing
- **Solution**: Check CORS settings in backend
- Verify backend URL is correct
- Check Network tab in browser DevTools

### Backend Issues

**Problem**: 500 Internal Server Error
- **Solution**: Check Render logs
- Verify all environment variables are set
- Check watsonx.ai API key is valid

**Problem**: Slow response times
- **Solution**: Render free tier spins down after inactivity
- First request may take 30-60 seconds
- Consider upgrading to paid tier for production

**Problem**: watsonx.ai connection fails
- **Solution**: Verify API key and project ID
- Check watsonx.ai service status
- Backend will fall back to mock mode if API unavailable

### LangFlow Issues

**Problem**: LangFlow not connecting
- **Solution**: LangFlow is optional for this deployment
- The backend works standalone with Granite client
- For local LangFlow: `pip install langflow && langflow run`

## Performance Optimization

### Frontend

1. Enable Vercel Analytics:
   - Go to project → **Analytics** → Enable

2. Optimize images:
   - Use WebP format
   - Lazy load images

3. Code splitting:
   - Already handled by Vite

### Backend

1. Enable caching:
   - Add Redis for response caching (Render add-on)

2. Rate limiting:
   - Add Flask-Limiter for API protection

3. Monitoring:
   - Use Render metrics dashboard
   - Set up error tracking (Sentry)

## Cost Breakdown (Free Tier Limits)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Vercel | ✅ Free | 100GB bandwidth/month |
| Render | ✅ Free | 750 hours/month, sleeps after 15min inactivity |
| watsonx.ai | ✅ Lite | 25,000 tokens/month |
| GitHub | ✅ Free | Unlimited public repos |

**Total Monthly Cost**: $0 (within free tier limits)

## Scaling for Production

When you're ready to scale beyond hackathon:

1. **Vercel Pro** ($20/month):
   - No bandwidth limits
   - Advanced analytics
   - Team collaboration

2. **Render Starter** ($7/month):
   - No sleep
   - 512MB RAM
   - Better performance

3. **watsonx.ai Standard** (Pay-as-you-go):
   - Higher token limits
   - Better performance
   - SLA guarantees

## Security Checklist

- ✅ API keys stored in environment variables (not in code)
- ✅ CORS configured for specific origins
- ✅ HTTPS enabled (automatic on Vercel/Render)
- ✅ Rate limiting implemented
- ✅ Input validation on all endpoints
- ✅ Error messages don't expose sensitive info

## Monitoring & Maintenance

### Health Checks

Set up monitoring for:
- Frontend: `https://emotipitch.vercel.app`
- Backend: `https://emotipitch-backend.onrender.com/api/health`

Use services like:
- UptimeRobot (free)
- Pingdom (free tier)
- Better Uptime (free tier)

### Logs

- **Vercel**: Real-time logs in dashboard
- **Render**: Real-time logs in dashboard
- **watsonx.ai**: Usage metrics in IBM Cloud dashboard

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Render: [render.com/docs](https://render.com/docs)
- watsonx.ai: [IBM Support](https://www.ibm.com/support)

## Next Steps

After successful deployment:
1. Share your live demo URL
2. Submit to June Innovation Challenge
3. Gather user feedback
4. Iterate and improve
5. Consider adding features:
   - User authentication
   - Match history
   - Social sharing
   - Multi-language support

---

**Congratulations!** 🎉 Your EmotiPitch application is now live and ready for the hackathon presentation!