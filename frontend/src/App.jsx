import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import MatchWatcher from './components/MatchWatcher'
import EmotionBar from './components/EmotionBar'
import AIExplanation from './components/AIExplanation'
import CoachSimulation from './components/CoachSimulation'
import EmotionTacticMap from './components/EmotionTacticMap'

function AppContent() {
  const [currentEmotion, setCurrentEmotion] = useState('neutral')
  const [emotionHistory, setEmotionHistory] = useState([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanationData, setExplanationData] = useState(null)
  const [showCoachMode, setShowCoachMode] = useState(false)
  const [matchEnded, setMatchEnded] = useState(false)
  const [videoTimestamp, setVideoTimestamp] = useState(0)

  // Handle emotion detection updates
  const handleEmotionUpdate = (emotion, timestamp) => {
    setCurrentEmotion(emotion)
    setVideoTimestamp(timestamp)
    
    // Add to emotion history for post-match visualization
    setEmotionHistory(prev => [...prev, {
      emotion,
      timestamp,
      time: new Date().toISOString()
    }])
  }

  // Trigger AI explanation when frustration detected
  const handleExplanationTrigger = (matchEvent, timestamp) => {
    setShowExplanation(true)
    // Explanation data will be fetched by AIExplanation component
  }

  // Handle match end
  const handleMatchEnd = () => {
    setMatchEnded(true)
    setShowCoachMode(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] dark:from-[#0a0a0f] dark:to-[#1a1a2e] light:from-gray-50 light:to-gray-100 font-poppins transition-colors duration-300 relative overflow-hidden">
      {/* Football Stadium Background */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920')] bg-cover bg-center blur-sm"></div>
      </div>
      
      {/* Animated Football Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating footballs */}
        <motion.div
          className="absolute text-6xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '5%' }}
        >
          ⚽
        </motion.div>
        <motion.div
          className="absolute text-5xl opacity-15"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '60%', right: '10%' }}
        >
          ⚽
        </motion.div>
        <motion.div
          className="absolute text-7xl opacity-10"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '15%', left: '15%' }}
        >
          🏆
        </motion.div>
      </div>

      <div className="relative z-10">
        <Header />
      
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 football-field opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
          >
            <motion.img
              src="/logo.png"
              alt="EmotiPitch Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 gradient-text"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            EmotiPitch
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 dark:text-gray-300 light:text-gray-700 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Feel the Game, Understand the Tactic
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-4"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-4xl">⚽</div>
            <div className="text-4xl">🏆</div>
            <div className="text-4xl">⚽</div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player - Takes 2 columns on large screens */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <MatchWatcher 
              onEmotionUpdate={handleEmotionUpdate}
              onExplanationTrigger={handleExplanationTrigger}
              onMatchEnd={handleMatchEnd}
              currentEmotion={currentEmotion}
            />
          </motion.div>

          {/* Emotion Bar - Takes 1 column */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <EmotionBar 
              currentEmotion={currentEmotion}
              timestamp={videoTimestamp}
            />
          </motion.div>
        </div>

        {/* AI Explanation Card */}
        {showExplanation && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <AIExplanation 
              emotion={currentEmotion}
              timestamp={videoTimestamp}
              onClose={() => setShowExplanation(false)}
              onCoachModeStart={() => setShowCoachMode(true)}
            />
          </motion.div>
        )}

        {/* Coach Simulation */}
        {showCoachMode && !matchEnded && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <CoachSimulation 
              currentEmotion={currentEmotion}
              timestamp={videoTimestamp}
            />
          </motion.div>
        )}

        {/* Post-Match Emotion-Tactic Map */}
        {matchEnded && emotionHistory.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <EmotionTacticMap 
              emotionHistory={emotionHistory}
            />
          </motion.div>
        )}
      </section>

        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App

// Made with Bob
