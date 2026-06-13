import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const AIExplanation = ({ emotion, timestamp, onClose, onCoachModeStart }) => {
  const [explanation, setExplanation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayedText, setDisplayedText] = useState('')
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  // Match events based on timestamp
  const getMatchEvent = (time) => {
    if (time >= 5 && time <= 15) return "Di Maria penalty decision - VAR confirmed no foul"
    if (time >= 45 && time <= 55) return "Muani penalty appeal - referee waved play on"
    if (time >= 60 && time <= 75) return "Thuram simulation - booked for diving, France frustrated"
    if (time >= 95 && time <= 110) return "Martinez offside check - VAR confirmed tight offside"
    if (time >= 135 && time <= 150) return "Montiel handball - penalty awarded after VAR review"
    return "Key tactical moment in the match"
  }

  // Fetch AI explanation from backend
  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        setLoading(true)
        const matchEvent = getMatchEvent(timestamp)
        
        const response = await axios.post('/api/explain', {
          user_emotion: emotion,
          video_timestamp: timestamp,
          match_event: matchEvent
        })

        setExplanation(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching explanation:', err)
        // Fallback to mock data if backend is not available
        setExplanation(generateMockExplanation(emotion, timestamp))
        setLoading(false)
      }
    }

    fetchExplanation()
  }, [emotion, timestamp])

  // Generate mock explanation for demo purposes
  const generateMockExplanation = (emotion, time) => {
    const matchEvent = getMatchEvent(time)
    
    const explanations = {
      angry: {
        explanation: `I noticed you were upset about this decision. ${matchEvent}. The referee judged that the player left his leg in to simulate contact. VAR reviewed the incident and found no clear and obvious error - the on-field decision stood. This is frustrating because from one angle it looks like contact, but the referee had the best view and saw the simulation attempt. In high-stakes matches like this, referees are extra vigilant about diving.`,
        tactical_impact: "This decision shifted momentum. France had to reorganize their attack without the penalty advantage, forcing them to commit more players forward and leaving gaps in defense.",
        confidence: 87
      },
      confused: {
        explanation: `Let me break this down simply. ${matchEvent}. The VAR system checks for 'clear and obvious errors' - not just any contact. The referee saw the incident live and made a judgment call. VAR reviewed multiple angles but couldn't find definitive evidence to overturn it. Think of it like a chess move - sometimes what looks like a winning position isn't actually checkmate.`,
        tactical_impact: "Argentina maintained their defensive shape after this decision, keeping their 4-4-2 compact and forcing France to play wider, which suited Argentina's counter-attacking strategy.",
        confidence: 82
      },
      excited: {
        explanation: `That was an incredible moment! ${matchEvent}. The tactical brilliance here is in how the team exploited the space. Notice how the midfield created a numerical advantage by pulling defenders out of position. It's like a perfectly executed chess combination - every piece moved with purpose. The timing of the run, the weight of the pass, and the clinical finish all came together beautifully.`,
        tactical_impact: "This goal forced the opposition to push higher up the pitch, creating more space for counter-attacks. The momentum shift was palpable - you could see the confidence surge through the team.",
        confidence: 91
      },
      neutral: {
        explanation: `${matchEvent}. This is a textbook example of modern refereeing with VAR support. The referee made the initial call based on what they saw in real-time. VAR then reviewed the incident from multiple angles to check for any clear errors. The process took about 90 seconds, which is standard for penalty reviews. The decision stood because the evidence wasn't conclusive enough to overturn the on-field call.`,
        tactical_impact: "Both teams adjusted their tactics after this moment. The defending team maintained their disciplined shape, while the attacking team had to find alternative routes to goal through wider positions.",
        confidence: 85
      }
    }

    return explanations[emotion] || explanations.neutral
  }

  // Typewriter effect for explanation text
  useEffect(() => {
    if (explanation && !loading) {
      let index = 0
      const text = explanation.explanation
      setDisplayedText('')
      setTypewriterComplete(false)

      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setTypewriterComplete(true)
          clearInterval(interval)
        }
      }, 20) // 20ms per character for smooth typewriter effect

      return () => clearInterval(interval)
    }
  }, [explanation, loading])

  // Emotion-based styling
  const getEmotionStyle = () => {
    switch (emotion) {
      case 'angry':
        return 'from-emotion-red/20 to-red-900/20 border-emotion-red'
      case 'excited':
        return 'from-emotion-green/20 to-green-900/20 border-emotion-green'
      case 'confused':
        return 'from-emotion-yellow/20 to-yellow-900/20 border-emotion-yellow'
      default:
        return 'from-emotion-blue/20 to-blue-900/20 border-emotion-blue'
    }
  }

  const getEmotionEmoji = () => {
    switch (emotion) {
      case 'angry': return '😠'
      case 'excited': return '😃'
      case 'confused': return '😕'
      default: return '😐'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`glass-effect rounded-2xl p-8 shadow-2xl border-2 ${getEmotionStyle()}`}
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              {getEmotionEmoji()}
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-worldcup-gold">
                EmotiPitch Analysis
              </h3>
              <p className="text-sm text-gray-400">
                Emotion-aware tactical explanation
              </p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              className="football-spinner text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚽
            </motion.div>
            <p className="text-gray-300">Analyzing with IBM Granite AI...</p>
          </div>
        )}

        {/* Explanation Content */}
        {!loading && explanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Main Explanation */}
            <div className="mb-6 p-6 bg-white/5 rounded-xl">
              <p className="text-lg leading-relaxed text-gray-200">
                {displayedText}
                {!typewriterComplete && (
                  <motion.span
                    className="inline-block w-1 h-5 bg-worldcup-gold ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </p>
            </div>

            {/* Tactical Impact */}
            {typewriterComplete && (
              <motion.div
                className="mb-6 p-6 bg-football-green/10 rounded-xl border border-football-green/30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-lg font-semibold text-worldcup-gold mb-3 flex items-center gap-2">
                  <span>⚡</span> Tactical Impact
                </h4>
                <p className="text-gray-300">
                  {explanation.tactical_impact}
                </p>
              </motion.div>
            )}

            {/* Confidence Score */}
            {typewriterComplete && (
              <motion.div
                className="mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">AI Confidence</span>
                  <span className="text-lg font-bold text-worldcup-gold">
                    {explanation.confidence}%
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-football-green to-worldcup-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${explanation.confidence}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            {typewriterComplete && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  onClick={onCoachModeStart}
                  className="flex-1 bg-gradient-to-r from-football-green to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg btn-hover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎯 Enter Coach Mode
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Watching
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-emotion-red mb-4">⚠️ {error}</p>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default AIExplanation

// Made with Bob
