# EmotiPitch Quick Start Guide 🚀

Get EmotiPitch running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.9+ installed
- Modern browser (Chrome, Firefox, Edge)

## Step 1: Clone & Navigate

```bash
git clone https://github.com/yourusername/emotipitch.git
cd emotipitch
```

## Step 2: Start Backend (Terminal 1)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend (will use mock mode without API key)
python app.py
```

✅ Backend running at `http://localhost:5000`

## Step 3: Start Frontend (Terminal 2)

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

## Step 4: Open & Test

1. Open browser to `http://localhost:5173`
2. Click **"Start Camera"** (or use manual mood selector)
3. Watch the video - AI explanations will trigger automatically
4. Try **Coach Mode** to make tactical decisions
5. View **Emotion-Tactic Map** after video ends

## Features to Test

### 1. Emotion Detection
- Grant camera permission when prompted
- Your face will appear in small overlay
- Emotion bar updates in real-time
- Try different expressions (smile, frown, neutral)

### 2. AI Explanations
- Automatic trigger at 1:07 (Thuram simulation moment)
- Click "Enter Coach Mode" button
- See typewriter animation effect

### 3. Coach Simulation
- Choose from 3 tactical options
- Watch AI simulate outcome
- Compare with real coach decision
- Click "Try Another Scenario"

### 4. Post-Match Analysis
- Let video play to end
- See emotion timeline graph
- Click tactical moments to review
- View emotion distribution

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.9+

# Try with python3
python3 app.py
```

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Camera not working
- Use **manual mood selector** buttons instead
- Check browser permissions (Settings → Privacy → Camera)
- Try different browser

### API errors
- Backend runs in **mock mode** without watsonx.ai API key
- All features work with mock data
- To use real IBM Granite LLM:
  1. Get free API key from [watsonx.ai](https://www.ibm.com/watsonx)
  2. Copy `backend/.env.example` to `backend/.env`
  3. Add your API key
  4. Restart backend

## Next Steps

- Read full [README.md](./README.md) for detailed documentation
- Check [deployment.md](./deployment.md) for production deployment
- Customize match video by changing `YOUTUBE_VIDEO_ID` in `MatchWatcher.jsx`

## Need Help?

- Check console for errors (F12 in browser)
- Backend logs show in terminal
- Open GitHub issue for bugs

---

**Enjoy EmotiPitch!** ⚽🤖