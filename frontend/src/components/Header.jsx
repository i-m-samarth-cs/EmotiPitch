import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <motion.header
      className="bg-gradient-to-r from-football-green to-[#1B5E20] dark:from-[#1a4d2e] dark:to-[#0f3a1f] light:from-green-600 light:to-green-700 shadow-lg transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 md:w-14 md:h-14"
            >
              <img
                src="/logo.png"
                alt="EmotiPitch Logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                EmotiPitch
                <span className="text-lg">⚽</span>
              </h1>
              <p className="text-sm text-gray-200 hidden md:block">
                The Emotion-Driven Tactical Mirror
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-16 h-8 bg-white/20 rounded-full p-1 transition-colors duration-300 hover:bg-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                animate={{
                  x: theme === 'dark' ? 0 : 32
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <span className="text-sm">
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
              </motion.div>
            </motion.button>

            {/* Stadium Floodlights Indicator */}
            <div className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <motion.span
                className="text-xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💡
              </motion.span>
              <span className="text-white text-sm font-medium">
                {theme === 'dark' ? 'Night Match' : 'Day Match'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

// Made with Bob
