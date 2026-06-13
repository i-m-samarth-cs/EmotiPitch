import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const EmotionBar = ({ currentEmotion, timestamp }) => {
  const [emotionIntensity, setEmotionIntensity] = useState(50)

  // Emotion configurations
  const emotionConfig = {
    angry: {
      color: 'from-emotion-red to-red-700',
      emoji: '😠',
      label: 'Angry',
      description: 'You seem frustrated with the decision',
      bgClass: 'emotion-angry'
    },
    excited: {
      color: 'from-emotion-green to-green-700',
      emoji: '😃',
      label: 'Excited',
      description: 'You\'re enjoying this moment!',
      bgClass: 'emotion-excited'
    },
    confused: {
      color: 'from-emotion-yellow to-yellow-600',
      emoji: '😕',
      label: 'Confused',
      description: 'This tactical decision is puzzling',
      bgClass: 'emotion-confused'
    },
    neutral: {
      color: 'from-emotion-blue to-blue-700',
      emoji: '😐',
      label: 'Neutral',
      description: 'Watching calmly',
      bgClass: 'emotion-neutral'
    }
  }

  const config = emotionConfig[currentEmotion] || emotionConfig.neutral

  // Simulate emotion intensity changes
  useEffect(() => {
    const intensity = Math.floor(Math.random() * 30) + 60 // 60-90%
    setEmotionIntensity(intensity)
  }, [currentEmotion])

  return (
    <motion.div 
      className="glass-effect rounded-2xl p-6 shadow-2xl h-full"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-worldcup-gold mb-2">
          Emotion Monitor
        </h2>
        <p className="text-sm text-gray-400">
          Real-time mood tracking
        </p>
      </div>

      {/* Current Emotion Display */}
      <motion.div
        key={currentEmotion}
        className={`${config.bgClass} rounded-xl p-6 mb-6 text-center`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="text-6xl mb-3"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          {config.emoji}
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">
          {config.label}
        </h3>
        <p className="text-sm opacity-90">
          {config.description}
        </p>
      </motion.div>

      {/* Emotion Intensity Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Intensity</span>
          <span className="text-sm font-bold text-worldcup-gold">
            {emotionIntensity}%
          </span>
        </div>
        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${config.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${emotionIntensity}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
          <span className="text-worldcup-gold">⏱️</span>
          <span className="text-sm font-medium">
            {Math.floor(timestamp / 60)}:{(timestamp % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Emotion History Mini Chart */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          Recent Emotions
        </h4>
        <div className="flex justify-between items-end h-20 gap-2">
          {[...Array(8)].map((_, i) => {
            const emotions = ['neutral', 'excited', 'confused', 'angry', 'neutral', 'confused', 'angry', currentEmotion]
            const emotion = emotions[i]
            const height = Math.random() * 60 + 40
            
            return (
              <motion.div
                key={i}
                className={`flex-1 rounded-t-lg ${emotionConfig[emotion].bgClass} opacity-70`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                title={emotionConfig[emotion].label}
              />
            )
          })}
        </div>
      </div>

      {/* AI Status */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 bg-football-green/20 px-4 py-2 rounded-full">
          <motion.div
            className="w-2 h-2 bg-emotion-green rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-gray-300">
            AI Monitoring Active
          </span>
        </div>
      </motion.div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          💡 <span className="font-semibold">Tip:</span> Your emotions help EmotiPitch generate personalized tactical explanations
        </p>
      </div>
    </motion.div>
  )
}

export default EmotionBar

// Made with Bob
