import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const CoachSimulation = ({ currentEmotion, timestamp }) => {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [simulating, setSimulating] = useState(false)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // Match situations based on game context
  const situations = [
    {
      id: 1,
      title: "High Pressure Situation",
      description: "Argentina is pressing high with 3 attackers. Brazil just lost their key midfielder to injury. The score is 1-1 in the 75th minute. What tactical adjustment do you make?",
      choices: [
        { id: 'A', text: 'Switch to 3-5-2 formation', icon: '🔄' },
        { id: 'B', text: 'Sub off striker for defensive midfielder', icon: '🔁' },
        { id: 'C', text: 'Hold current 4-3-3 formation', icon: '⚡' }
      ]
    },
    {
      id: 2,
      title: "Counter-Attack Opportunity",
      description: "France is committing players forward after a VAR decision. You have fast wingers ready. The opposition defense is stretched. What's your move?",
      choices: [
        { id: 'A', text: 'Launch immediate counter with long ball', icon: '⚡' },
        { id: 'B', text: 'Maintain possession and build slowly', icon: '🎯' },
        { id: 'C', text: 'Press high to win ball in attacking third', icon: '🔥' }
      ]
    },
    {
      id: 3,
      title: "Defensive Crisis",
      description: "Your center-back just received a yellow card. The opposition striker is exploiting the space behind. 20 minutes remaining. How do you respond?",
      choices: [
        { id: 'A', text: 'Drop defensive line 10 yards deeper', icon: '🛡️' },
        { id: 'B', text: 'Switch to man-marking on striker', icon: '👤' },
        { id: 'C', text: 'Add extra midfielder for protection', icon: '➕' }
      ]
    }
  ]

  const currentSituation = situations[Math.floor(timestamp / 60) % situations.length]

  // Handle choice selection
  const handleChoiceSelect = async (choice) => {
    setSelectedChoice(choice)
    setSimulating(true)
    setShowResult(false)

    try {
      // Call backend simulation endpoint
      const response = await axios.post('/api/simulate', {
        situation: currentSituation.description,
        user_choice: choice.text,
        emotion: currentEmotion,
        timestamp: timestamp
      })

      // Simulate delay for dramatic effect
      setTimeout(() => {
        setResult(response.data)
        setSimulating(false)
        setShowResult(true)
      }, 2000)
    } catch (error) {
      console.error('Simulation error:', error)
      // Fallback to mock simulation
      setTimeout(() => {
        setResult(generateMockSimulation(choice))
        setSimulating(false)
        setShowResult(true)
      }, 2000)
    }
  }

  // Generate mock simulation result
  const generateMockSimulation = (choice) => {
    const outcomes = {
      'A': {
        outcome: "Argentina scores in 3 minutes! ⚽",
        reason: "The formation switch created numerical superiority in midfield, but left gaps in defense. Argentina exploited the space with a quick counter-attack through the channels.",
        realCoach: "The real coach chose option B (defensive midfielder), which successfully neutralized Argentina's press and led to a 2-1 victory.",
        confidence: 72,
        success: false,
        emoji: '🛑'
      },
      'B': {
        outcome: "Tactical masterclass! Defense holds strong ✅",
        reason: "The defensive midfielder provided crucial cover, breaking up Argentina's attacks and allowing Brazil to maintain shape. The team absorbed pressure and created counter-attacking opportunities.",
        realCoach: "The real coach made the same decision! This tactical adjustment was key to controlling the midfield battle and securing the win.",
        confidence: 91,
        success: true,
        emoji: '✅'
      },
      'C': {
        outcome: "Risky decision - conceded after 8 minutes 🛑",
        reason: "Maintaining the same formation without adjustments allowed Argentina to continue exploiting the midfield gap. The lack of defensive reinforcement proved costly.",
        realCoach: "The real coach recognized the danger and made a substitution (option B), which proved decisive in the match outcome.",
        confidence: 65,
        success: false,
        emoji: '⚠️'
      }
    }

    return outcomes[choice.id] || outcomes['B']
  }

  // Reset simulation
  const handleTryAgain = () => {
    setSelectedChoice(null)
    setResult(null)
    setShowResult(false)
    setSimulating(false)
  }

  return (
    <motion.div
      className="glass-effect rounded-2xl p-8 shadow-2xl border-2 border-worldcup-gold"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-block text-6xl mb-4"
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎯
        </motion.div>
        <h2 className="text-3xl font-bold text-worldcup-gold mb-2">
          Coach Simulation Mode
        </h2>
        <p className="text-gray-300">
          Step into the coach's mind and make tactical decisions
        </p>
      </div>

      {/* Situation Card */}
      {!showResult && (
        <motion.div
          className="mb-8 p-6 bg-gradient-to-br from-football-green/20 to-green-900/20 rounded-xl border border-football-green/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-xl font-bold text-worldcup-gold mb-3">
            {currentSituation.title}
          </h3>
          <p className="text-gray-200 leading-relaxed">
            {currentSituation.description}
          </p>
        </motion.div>
      )}

      {/* Choice Buttons */}
      {!simulating && !showResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {currentSituation.choices.map((choice, index) => (
            <motion.button
              key={choice.id}
              onClick={() => handleChoiceSelect(choice)}
              className={`p-6 rounded-xl font-semibold text-lg transition-all ${
                selectedChoice?.id === choice.id
                  ? 'bg-gradient-to-br from-worldcup-gold to-yellow-600 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              } border-2 border-transparent hover:border-worldcup-gold`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-3">{choice.icon}</div>
              <div className="text-sm mb-2 font-bold">Option {choice.id}</div>
              <div className="text-base">{choice.text}</div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Simulating State */}
      {simulating && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            <div className="text-8xl">⚽</div>
          </motion.div>
          <motion.p
            className="text-2xl font-bold text-worldcup-gold mb-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI Simulating Outcome...
          </motion.p>
          <p className="text-gray-400">
            Analyzing tactical implications with IBM Granite
          </p>
        </motion.div>
      )}

      {/* Result Display */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Outcome Header */}
            <motion.div
              className={`p-6 rounded-xl mb-6 text-center ${
                result.success 
                  ? 'bg-gradient-to-br from-emotion-green/30 to-green-900/30 border-2 border-emotion-green'
                  : 'bg-gradient-to-br from-emotion-red/30 to-red-900/30 border-2 border-emotion-red'
              }`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                {result.emoji}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">
                {result.outcome}
              </h3>
            </motion.div>

            {/* Tactical Reason */}
            <motion.div
              className="p-6 bg-white/5 rounded-xl mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-worldcup-gold mb-3">
                📊 Tactical Analysis
              </h4>
              <p className="text-gray-200 leading-relaxed">
                {result.reason}
              </p>
            </motion.div>

            {/* Real Coach Comparison */}
            <motion.div
              className="p-6 bg-football-green/10 rounded-xl border border-football-green/30 mb-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold text-worldcup-gold mb-3">
                👔 Real Coach Decision
              </h4>
              <p className="text-gray-200 leading-relaxed">
                {result.realCoach}
              </p>
            </motion.div>

            {/* Confidence Bar */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">AI Confidence</span>
                <span className="text-lg font-bold text-worldcup-gold">
                  {result.confidence}%
                </span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    result.success 
                      ? 'bg-gradient-to-r from-emotion-green to-green-600'
                      : 'bg-gradient-to-r from-emotion-red to-red-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </div>
            </motion.div>

            {/* Try Again Button */}
            <motion.button
              onClick={handleTryAgain}
              className="w-full bg-gradient-to-r from-worldcup-gold to-yellow-600 text-black px-6 py-4 rounded-xl font-bold text-lg shadow-lg btn-hover"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Try Another Scenario
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CoachSimulation

// Made with Bob
