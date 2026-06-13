import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const EmotionTacticMap = ({ emotionHistory }) => {
  // Key tactical moments from the match
  const tacticalMoments = [
    { time: 8, label: "VAR Decision", description: "Di Maria penalty confirmed" },
    { time: 48, label: "Penalty Appeal", description: "Muani appeal waved on" },
    { time: 67, label: "Simulation", description: "Thuram booked for diving" },
    { time: 103, label: "Offside Check", description: "Martinez offside confirmed" },
    { time: 142, label: "Handball", description: "Montiel penalty awarded" }
  ]

  // Convert emotion to intensity value
  const emotionToIntensity = (emotion) => {
    const intensityMap = {
      'angry': 90,
      'excited': 85,
      'confused': 60,
      'neutral': 40
    }
    return intensityMap[emotion] || 40
  }

  // Prepare chart data
  const chartData = emotionHistory.map((entry, index) => ({
    timestamp: entry.timestamp,
    intensity: emotionToIntensity(entry.emotion),
    emotion: entry.emotion,
    time: `${Math.floor(entry.timestamp / 60)}:${(entry.timestamp % 60).toString().padStart(2, '0')}`
  }))

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const moment = tacticalMoments.find(m => Math.abs(m.time - data.timestamp) < 5)
      
      return (
        <div className="bg-[#1a1a2e] border-2 border-worldcup-gold rounded-lg p-4 shadow-xl">
          <p className="text-worldcup-gold font-bold mb-2">
            Time: {data.time}
          </p>
          <p className="text-white mb-1">
            Emotion: <span className="capitalize font-semibold">{data.emotion}</span>
          </p>
          <p className="text-gray-300 text-sm">
            Intensity: {data.intensity}%
          </p>
          {moment && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-football-green font-semibold text-sm">
                ⚽ {moment.label}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {moment.description}
              </p>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  // Get emotion color
  const getEmotionColor = (emotion) => {
    const colors = {
      'angry': '#E53935',
      'excited': '#00C853',
      'confused': '#FFC107',
      'neutral': '#1E88E5'
    }
    return colors[emotion] || colors.neutral
  }

  return (
    <motion.div
      className="glass-effect rounded-2xl p-8 shadow-2xl"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-block text-6xl mb-4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          📊
        </motion.div>
        <h2 className="text-3xl font-bold text-worldcup-gold mb-2">
          Emotion-Tactic Map
        </h2>
        <p className="text-gray-300">
          Your emotional journey through the match
        </p>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="#FFD700"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#FFD700"
              style={{ fontSize: '12px' }}
              label={{ value: 'Emotion Intensity', angle: -90, position: 'insideLeft', fill: '#FFD700' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines for tactical moments */}
            {tacticalMoments.map((moment, index) => (
              <ReferenceLine
                key={index}
                x={`${Math.floor(moment.time / 60)}:${(moment.time % 60).toString().padStart(2, '0')}`}
                stroke="#2E7D32"
                strokeDasharray="3 3"
                label={{ 
                  value: moment.label, 
                  position: 'top',
                  fill: '#FFD700',
                  fontSize: 10
                }}
              />
            ))}
            
            <Line 
              type="monotone" 
              dataKey="intensity" 
              stroke="#FFD700" 
              strokeWidth={3}
              dot={{ fill: '#FFD700', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tactical Moments Timeline */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-worldcup-gold mb-4">
          Key Tactical Moments
        </h3>
        <div className="space-y-3">
          {tacticalMoments.map((moment, index) => {
            // Find emotion at this moment
            const emotionAtMoment = emotionHistory.find(
              e => Math.abs(e.timestamp - moment.time) < 5
            )
            const emotion = emotionAtMoment?.emotion || 'neutral'
            
            return (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-worldcup-gold font-bold">
                    {Math.floor(moment.time / 60)}:{(moment.time % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getEmotionColor(emotion) }}
                />
                <div className="flex-1">
                  <div className="font-semibold text-white">{moment.label}</div>
                  <div className="text-sm text-gray-400">{moment.description}</div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-2xl">
                    {emotion === 'angry' ? '😠' :
                     emotion === 'excited' ? '😃' :
                     emotion === 'confused' ? '😕' : '😐'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Emotion Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['angry', 'excited', 'confused', 'neutral'].map((emotion, index) => {
          const count = emotionHistory.filter(e => e.emotion === emotion).length
          const percentage = emotionHistory.length > 0 
            ? Math.round((count / emotionHistory.length) * 100) 
            : 0
          
          return (
            <motion.div
              key={emotion}
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: `${getEmotionColor(emotion)}20` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">
                {emotion === 'angry' ? '😠' :
                 emotion === 'excited' ? '😃' :
                 emotion === 'confused' ? '😕' : '😐'}
              </div>
              <div className="text-sm text-gray-300 capitalize mb-1">
                {emotion}
              </div>
              <div className="text-2xl font-bold" style={{ color: getEmotionColor(emotion) }}>
                {percentage}%
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Insights */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-football-green/20 to-green-900/20 rounded-xl border border-football-green/30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h4 className="text-lg font-bold text-worldcup-gold mb-3">
          💡 EmotiPitch Insights
        </h4>
        <p className="text-gray-200 leading-relaxed">
          Your emotions peaked during controversial VAR decisions, showing how tactical moments 
          directly impact fan engagement. EmotiPitch detected {emotionHistory.length} emotion changes 
          throughout the match, with the highest intensity at the {
            tacticalMoments.find(m => {
              const e = emotionHistory.find(eh => Math.abs(eh.timestamp - m.time) < 5)
              return e && emotionToIntensity(e.emotion) > 80
            })?.label || 'key moments'
          }. This emotional connection to tactical decisions is what makes football truly captivating.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default EmotionTacticMap

// Made with Bob
