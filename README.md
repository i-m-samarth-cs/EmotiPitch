<div align="center">

# ⚽ EmotiPitch

### The Emotion-Driven Tactical Mirror

*AI-powered football match companion that bridges emotions with tactical understanding*

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![IBM Granite](https://img.shields.io/badge/IBM-Granite_LLM-0F62FE?style=flat-square&logo=ibm)](https://www.ibm.com/watsonx)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[Features](#-features) • [Demo](#-quick-start) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage)

![EmotiPitch Demo](https://via.placeholder.com/800x400/2E7D32/FFFFFF?text=EmotiPitch+Demo)

</div>

---

## 🎯 Problem Statement

Football fans experience intense emotions during matches but struggle to understand how those emotions connect to tactical shifts. Traditional tactical explainers are dry, technical, and emotionally disconnected.

**EmotiPitch solves this by making tactical explainability human-centered through emotion-aware AI.**

## 💡 Solution

EmotiPitch is an AI-powered match companion that:

- 🎭 **Detects emotions** in real-time using facial recognition
- 🤖 **Generates empathetic explanations** adapted to your emotional state
- 🎯 **Simulates tactical decisions** with AI-powered outcomes
- 📊 **Visualizes emotion-tactic connections** post-match

---

## ✨ Features

### 1. 📹 Real-Time Emotion Detection

- **Browser-based facial recognition** using face-api.js (privacy-first)
- **Live emotion monitoring** with confidence scores
- **Automatic AI triggers** at key match moments
- **Manual mood selector** as fallback
- **Visual feedback** with emotion labels and colors

<div align="center">
<img src="https://via.placeholder.com/600x300/1E88E5/FFFFFF?text=Emotion+Detection" alt="Emotion Detection" width="600"/>
</div>

### 2. 🤖 Emotion-Adaptive AI Explanations

Powered by **IBM Granite-3.0-8B-Instruct** via watsonx.ai:

- **Empathetic responses** matching your emotion:
  - 😠 **Angry**: "I saw you were upset. Here's why the referee didn't intervene..."
  - 😕 **Confused**: "Let me break this down simply..."
  - 😃 **Excited**: "That was amazing! The tactic behind it was..."
  - 😐 **Neutral**: "Let me explain what happened here..."

- **Tactical breakdowns** with formations and player positions
- **Momentum analysis** showing game-changing impacts
- **Visual metaphors** for easy understanding
- **Confidence scoring** for transparency

### 3. 🎯 Interactive Coach Simulation

- **Step into the coach's shoes** with real tactical scenarios
- **Three strategic choices** per situation
- **AI-simulated outcomes** with detailed reasoning
- **Real coach comparisons** from actual matches
- **Try different strategies** to learn tactical thinking

### 4. 📊 Post-Match Emotion-Tactic Map

- **Interactive timeline** showing emotion intensity
- **Tactical moment overlays** at key timestamps
- **Click-to-explore** past explanations
- **Emotion distribution** analytics
- **AI-generated insights** connecting feelings to tactics

### 5. 🌓 Dark/Light Mode

- **Theme toggle** with smooth transitions
- **Stadium floodlight indicator** (Night Match / Day Match)
- **Persistent preferences** saved locally
- **Optimized for both modes**

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI framework
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Responsive styling
- **face-api.js** - Browser-based emotion detection
- **Recharts** - Data visualization
- **react-youtube** - Video player

### Backend
- **Python Flask 3.0** - API server
- **IBM Granite LLM** - Emotion-aware AI (watsonx.ai)
- **LangFlow** - AI pipeline orchestration
- **Gunicorn** - Production server

### Deployment
- **Vercel** - Frontend hosting
- **Render.com** - Backend hosting
- **GitHub** - Version control

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Modern browser with camera support
- IBM watsonx.ai account (free tier)

### 1. Clone Repository

```bash
git clone https://github.com/i-m-samarth-cs/EmotiPitch.git
cd EmotiPitch
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your watsonx.ai API key

# Run backend
python app.py
```

Backend runs at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🚀 Usage

### Quick Start

1. **Open browser** to `http://localhost:5173`
2. **Toggle theme** using the 🌙/☀️ button in header
3. **Start camera** or use manual mood selector
4. **Watch the match** - AI explanations trigger automatically
5. **Enter Coach Mode** to make tactical decisions
6. **View emotion map** after match ends

### Test Scenarios

#### Scenario 1: Angry VAR Moment (1:07)
- Watch until timestamp 1:07 (Thuram simulation)
- Emotion detection shows "Angry"
- AI provides empathetic explanation

#### Scenario 2: Excited Goal (0:08)
- Set mood to "Excited" at 0:08
- AI responds with enthusiastic tone
- Tactical brilliance explained

#### Scenario 3: Confused Formation (1:43)
- Set mood to "Confused" at 1:43
- AI breaks down complex tactics simply
- VAR process explained clearly

---

## 🎨 Screenshots

<div align="center">

### Main Interface
![Main Interface](https://via.placeholder.com/800x400/2E7D32/FFFFFF?text=Main+Interface)

### Emotion Detection
![Emotion Detection](https://via.placeholder.com/800x400/E53935/FFFFFF?text=Emotion+Detection)

### AI Explanation
![AI Explanation](https://via.placeholder.com/800x400/00C853/FFFFFF?text=AI+Explanation)

### Coach Simulation
![Coach Simulation](https://via.placeholder.com/800x400/FFD700/000000?text=Coach+Simulation)

</div>

---

## 📁 Project Structure

```
EmotiPitch/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MatchWatcher.jsx
│   │   │   ├── EmotionBar.jsx
│   │   │   ├── AIExplanation.jsx
│   │   │   ├── CoachSimulation.jsx
│   │   │   └── EmotionTacticMap.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── logo.png
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                     # Flask API
│   ├── routes/
│   │   ├── explain.py          # Explanation endpoint
│   │   └── simulate.py         # Simulation endpoint
│   ├── utils/
│   │   ├── granite_client.py   # IBM Granite wrapper
│   │   └── langflow_orchestration.py
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── langflow/
│   └── emotipitch_flow.json    # AI pipeline
│
├── logo.png
├── .gitignore
├── vercel.json
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
CORS_ORIGINS=http://localhost:5173
```

### Getting watsonx.ai API Key

1. Sign up at [watsonx.ai](https://www.ibm.com/watsonx)
2. Create a new project
3. Generate API key from dashboard
4. Copy API key and Project ID to `.env`

---

## 🤖 AI Architecture

### Emotion Detection Pipeline
```
User Face → face-api.js → Emotion Classification → 
Confidence Score → Update UI → Trigger AI Explanation
```

### Explanation Generation Pipeline
```
Emotion + Match Event + Timestamp → 
LangFlow Orchestration → 
Emotion-Specific Prompt → 
IBM Granite LLM → 
Structured Response → 
Animated Display
```

### Key Innovations

1. **Emotion-Aware Prompting** - Dynamic templates adapting to user emotions
2. **Privacy-First Design** - All facial analysis in browser, no data sent to server
3. **Mock Mode Fallback** - Works without API key for demos
4. **Real-Time Sync** - Video timestamp synced with emotion detection
5. **Graceful Degradation** - Manual selector when camera unavailable

---

## 🎯 Use Cases

### For Football Fans
- Understand complex tactical decisions
- Learn why referees make certain calls
- Connect emotions to game strategy
- Improve tactical knowledge

### For Coaches & Analysts
- Demonstrate tactical concepts
- Analyze emotional impact of decisions
- Train tactical thinking
- Study fan engagement patterns

### For Educators
- Teach football tactics
- Explain VAR decisions
- Show emotion-strategy connections
- Interactive learning tool

---

## 🔒 Security & Privacy

### Privacy-First Design
- ✅ Facial analysis runs **entirely in browser**
- ✅ **No video or images** sent to server
- ✅ **No user data stored** without consent
- ✅ Camera access requires **explicit permission**

### Security Measures
- ✅ API keys in environment variables
- ✅ CORS configured for specific origins
- ✅ Input validation on all endpoints
- ✅ HTTPS enforced in production
- ✅ Rate limiting implemented

---

## 📊 Performance

- **Emotion Detection**: 2 FPS (500ms interval)
- **AI Response Time**: 2-4 seconds
- **Frontend Load**: < 2 seconds on 3G
- **Camera Latency**: < 100ms
- **Animation FPS**: 60 FPS

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend (Render.com)

1. Create Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy automatically

### Environment Setup

Add these to Render:
- `WATSONX_API_KEY`
- `WATSONX_PROJECT_ID`
- `WATSONX_URL`
- `CORS_ORIGINS` (your Vercel URL)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Samarth** - Full-stack Developer + AI Engineer
- Frontend: React, Tailwind, Framer Motion
- Backend: Flask, IBM Granite LLM
- AI/ML: face-api.js, LangFlow

---

## 🙏 Acknowledgments

- **IBM watsonx.ai** for Granite LLM access
- **face-api.js** for emotion detection library
- **LangFlow** for AI orchestration
- **Argentina vs France 2022** for match footage

---

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/i-m-samarth-cs/EmotiPitch/issues)
- **Email**: your.email@example.com
- **Documentation**: See inline code comments

---

## 🗺️ Roadmap

### Current Features ✅
- Real-time emotion detection
- AI-powered explanations
- Interactive coach simulation
- Emotion-tactic visualization
- Dark/light mode
- Logo integration

### Planned Features 🚧
- [ ] Multi-language support (Spanish, Portuguese, French)
- [ ] User authentication
- [ ] Match history tracking
- [ ] Social sharing
- [ ] Live match integration
- [ ] Mobile app (React Native)
- [ ] Voice-based emotion detection
- [ ] Team collaboration features

---

## 📈 Project Stats

- **Total Files**: 35+
- **Lines of Code**: 5000+
- **Components**: 7 React components
- **API Endpoints**: 2 (explain, simulate)
- **Supported Emotions**: 4 (angry, excited, confused, neutral)
- **Match Moments**: 5 key timestamps

---

<div align="center">

## ⚽ EmotiPitch

**Feel the Game, Understand the Tactic**

Made with ❤️ using React, Flask, and IBM Granite LLM

[⬆ Back to Top](#-emotipitch)

---

**Star ⭐ this repository if you find it helpful!**

</div>