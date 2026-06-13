import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gradient-to-r from-[#1B5E20] to-football-green dark:from-[#0f3a1f] dark:to-[#1a4d2e] light:from-green-700 light:to-green-600 mt-16 py-8 transition-colors duration-300 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Football Net Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="net" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="white" strokeWidth="1"/>
              <path d="M20 0 L20 40 M0 20 L40 20" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#net)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section with Logo */}
          <div>
            <h3 className="text-xl font-bold text-worldcup-gold mb-3 flex items-center justify-center md:justify-start gap-2">
              <motion.img
                src="/logo.png"
                alt="EmotiPitch"
                className="w-8 h-8 object-contain"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              About EmotiPitch
            </h3>
            <p className="text-gray-200 text-sm">
              An AI-powered football match companion that bridges emotions with tactical understanding.
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
              <motion.img
                src="/logo.png"
                alt="EmotiPitch Logo"
                className="w-12 h-12 object-contain"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span
                className="text-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏆
              </motion.span>
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                🥅
              </motion.span>
            </div>
          </div>

          {/* Stadium Features */}
          <div>
            <h3 className="text-xl font-bold text-worldcup-gold mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">🏟️</span>
              Features
            </h3>
            <ul className="text-gray-200 text-sm space-y-2">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>😊</span> Real-time Emotion Detection
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>🤖</span> AI Tactical Explanations
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>🎯</span> Interactive Coach Simulation
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>📊</span> Emotion-Tactic Mapping
              </li>
            </ul>
          </div>

          {/* World Cup Theme */}
          <div>
            <h3 className="text-xl font-bold text-worldcup-gold mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">🌍</span>
              World Cup Experience
            </h3>
            <p className="text-gray-200 text-sm mb-4">
              Experience the passion of World Cup matches with AI-powered insights
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <motion.div
                className="text-4xl"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏆
              </motion.div>
              <div className="text-left">
                <p className="text-worldcup-gold font-bold text-lg">FIFA World Cup</p>
                <p className="text-gray-300 text-xs">Tactical Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Football Players */}
        <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-center gap-8">
          <motion.div
            className="text-5xl"
            animate={{
              x: [-20, 20, -20],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🏃
          </motion.div>
          <motion.div
            className="text-6xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ⚽
          </motion.div>
          <motion.div
            className="text-5xl"
            animate={{
              x: [20, -20, 20],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🏃
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-gray-300 text-sm">
            © 2026 EmotiPitch | 
            <span className="text-worldcup-gold font-semibold"> Emotionally Explainable AI for Football</span>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Powered by IBM Granite LLM & face-api.js
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

// Made with Bob
