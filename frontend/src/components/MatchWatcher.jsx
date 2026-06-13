import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import YouTube from 'react-youtube'
import * as faceapi from 'face-api.js'

// Real YouTube video ID: Argentina vs France Ref & VAR Decisions
const YOUTUBE_VIDEO_ID = "utCuGCwrKJw"

// Key moments with timestamps (in seconds)
const KEY_MOMENTS = [
  { time: 8, event: "Di Maria penalty decision", emotion_trigger: "neutral" },
  { time: 48, event: "Muani penalty appeal", emotion_trigger: "confused" },
  { time: 67, event: "Thuram simulation - frustration moment", emotion_trigger: "angry" },
  { time: 103, event: "Martinez offside check", emotion_trigger: "confused" },
  { time: 142, event: "Montiel handball decision", emotion_trigger: "angry" }
]

const MatchWatcher = ({ onEmotionUpdate, onExplanationTrigger, onMatchEnd, currentEmotion }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [useCamera, setUseCamera] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [manualEmotion, setManualEmotion] = useState('neutral')
  const [showEmotionPulse, setShowEmotionPulse] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState('neutral')
  const [emotionConfidence, setEmotionConfidence] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  
  const videoRef = useRef(null)
  const cameraVideoRef = useRef(null)
  const playerRef = useRef(null)
  const intervalRef = useRef(null)

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ])
        setModelsLoaded(true)
        console.log('Face-api models loaded successfully')
      } catch (error) {
        console.error('Error loading face-api models:', error)
      }
    }
    loadModels()
  }, [])

  // Start camera for emotion detection
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240 } 
      })
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream
        setCameraReady(true)
        setUseCamera(true)
        startEmotionDetection()
      }
    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Camera not available. Using manual mood selector instead.')
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (cameraVideoRef.current && cameraVideoRef.current.srcObject) {
      const tracks = cameraVideoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      setCameraReady(false)
      setUseCamera(false)
    }
  }

  // Detect emotions from camera
  const startEmotionDetection = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(async () => {
      if (cameraVideoRef.current && modelsLoaded && cameraReady) {
        try {
          const detections = await faceapi
            .detectSingleFace(cameraVideoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()

          if (detections && detections.expressions) {
            setFaceDetected(true)
            const expressions = detections.expressions
            const dominantEmotion = getDominantEmotion(expressions)
            
            // Get confidence score
            const emotionMap = {
              angry: 'angry',
              happy: 'excited',
              surprised: 'excited',
              sad: 'confused',
              fearful: 'confused',
              disgusted: 'angry',
              neutral: 'neutral'
            }
            
            let maxValue = 0
            Object.entries(expressions).forEach(([emotion, value]) => {
              if (emotionMap[emotion] === dominantEmotion && value > maxValue) {
                maxValue = value
              }
            })
            
            setDetectedEmotion(dominantEmotion)
            setEmotionConfidence(Math.round(maxValue * 100))
            
            if (dominantEmotion !== currentEmotion) {
              setShowEmotionPulse(true)
              setTimeout(() => setShowEmotionPulse(false), 1000)
              console.log(`🎭 Emotion detected: ${dominantEmotion} (${Math.round(maxValue * 100)}% confidence)`)
            }
            
            onEmotionUpdate(dominantEmotion, currentTime)
          } else {
            setFaceDetected(false)
          }
        } catch (error) {
          console.error('Emotion detection error:', error)
          setFaceDetected(false)
        }
      }
    }, 500) // Check every 500ms
  }

  // Get dominant emotion from face-api expressions
  const getDominantEmotion = (expressions) => {
    const emotionMap = {
      angry: 'angry',
      happy: 'excited',
      surprised: 'excited',
      sad: 'confused',
      fearful: 'confused',
      disgusted: 'angry',
      neutral: 'neutral'
    }

    let maxEmotion = 'neutral'
    let maxValue = 0

    Object.entries(expressions).forEach(([emotion, value]) => {
      if (value > maxValue) {
        maxValue = value
        maxEmotion = emotionMap[emotion] || 'neutral'
      }
    })

    return maxEmotion
  }

  // Handle manual emotion selection
  const handleManualEmotionChange = (emotion) => {
    setManualEmotion(emotion)
    console.log(`🎭 Manual emotion selected: ${emotion}`)
    onEmotionUpdate(emotion, currentTime)
    setShowEmotionPulse(true)
    setTimeout(() => setShowEmotionPulse(false), 1000)
  }

  // YouTube player ready
  const onPlayerReady = (event) => {
    playerRef.current = event.target
  }

  // YouTube player state change
  const onPlayerStateChange = (event) => {
    if (event.data === 1) { // Playing
      setIsPlaying(true)
      startTimeTracking()
    } else {
      setIsPlaying(false)
    }

    if (event.data === 0) { // Ended
      onMatchEnd()
      stopCamera()
    }
  }

  // Track video time and trigger explanations
  const startTimeTracking = () => {
    const trackTime = setInterval(() => {
      if (playerRef.current) {
        const time = Math.floor(playerRef.current.getCurrentTime())
        setCurrentTime(time)

        // Check for key moments
        KEY_MOMENTS.forEach(moment => {
          if (time === moment.time) {
            // Trigger explanation for frustration moments
            if (moment.emotion_trigger === 'angry' || moment.emotion_trigger === 'confused') {
              onExplanationTrigger(moment.event, time)
            }
          }
        })
      }
    }, 1000)

    return () => clearInterval(trackTime)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0
    }
  }

  return (
    <motion.div 
      className="glass-effect rounded-2xl overflow-hidden shadow-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        <YouTube
          videoId={YOUTUBE_VIDEO_ID}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          className="w-full h-full"
        />
        
        {/* Emotion Pulse Overlay */}
        {showEmotionPulse && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1 }}
          >
            <div className={`w-full h-full border-8 ${
              currentEmotion === 'angry' ? 'border-emotion-red' :
              currentEmotion === 'excited' ? 'border-emotion-green' :
              currentEmotion === 'confused' ? 'border-emotion-yellow' :
              'border-emotion-blue'
            }`}></div>
          </motion.div>
        )}

        {/* Camera Overlay with Emotion Display */}
        {useCamera && cameraReady && (
          <motion.div
            className="absolute top-4 right-4 w-40 h-32 rounded-lg overflow-hidden border-2 border-worldcup-gold shadow-lg bg-black"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <video
              ref={cameraVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover mirror"
              style={{ transform: 'scaleX(-1)' }}
            />
            {/* Emotion Label Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {faceDetected ? (
                <div className="absolute top-2 left-2 right-2">
                  <div className={`text-center py-1 px-2 rounded-md text-xs font-bold ${
                    detectedEmotion === 'angry' ? 'bg-emotion-red' :
                    detectedEmotion === 'excited' ? 'bg-emotion-green' :
                    detectedEmotion === 'confused' ? 'bg-emotion-yellow text-black' :
                    'bg-emotion-blue'
                  }`}>
                    {detectedEmotion === 'angry' ? '😠 Angry' :
                     detectedEmotion === 'excited' ? '😃 Excited' :
                     detectedEmotion === 'confused' ? '😕 Confused' : '😐 Neutral'}
                    <div className="text-[10px] mt-0.5">{emotionConfidence}% confident</div>
                  </div>
                </div>
              ) : (
                <div className="absolute top-2 left-2 right-2 bg-red-500/80 text-white text-center py-1 px-2 rounded-md text-xs font-bold">
                  No face detected
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
              {faceDetected ? '✅ Detecting...' : '❌ Show your face'}
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls Panel */}
      <div className="p-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Camera Toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={useCamera ? stopCamera : startCamera}
              disabled={!modelsLoaded}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                useCamera 
                  ? 'bg-emotion-red hover:bg-red-600' 
                  : 'bg-football-green hover:bg-green-700'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed btn-hover`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {useCamera ? '📷 Stop Camera' : '📷 Start Camera'}
            </motion.button>
            {!modelsLoaded && (
              <span className="text-sm text-gray-400">Loading AI models...</span>
            )}
          </div>

          {/* Manual Emotion Selector - Always Visible */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-sm text-gray-300 font-semibold">Manual Mood:</span>
            <div className="flex gap-2">
              {['angry', 'excited', 'confused', 'neutral'].map(emotion => (
                <motion.button
                  key={emotion}
                  onClick={() => handleManualEmotionChange(emotion)}
                  className={`px-5 py-3 rounded-xl text-lg font-bold transition-all shadow-lg ${
                    (useCamera ? detectedEmotion : manualEmotion) === emotion
                      ? emotion === 'angry' ? 'bg-emotion-red scale-110' :
                        emotion === 'excited' ? 'bg-emotion-green scale-110' :
                        emotion === 'confused' ? 'bg-emotion-yellow text-black scale-110' :
                        'bg-emotion-blue scale-110'
                      : 'bg-white/10 hover:bg-white/20'
                  } text-white border-2 ${
                    (useCamera ? detectedEmotion : manualEmotion) === emotion
                      ? 'border-worldcup-gold'
                      : 'border-transparent'
                  }`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  title={emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">
                      {emotion === 'angry' ? '😠' :
                       emotion === 'excited' ? '😃' :
                       emotion === 'confused' ? '😕' : '😐'}
                    </span>
                    <span className="text-[10px] mt-1 capitalize">{emotion}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            🎥 Argentina vs France - World Cup 2022 VAR Decisions
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Watch key moments at: 0:08, 0:48, 1:07 (frustration trigger), 1:43, 2:23
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default MatchWatcher

// Made with Bob
