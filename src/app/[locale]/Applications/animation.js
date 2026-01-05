'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCog } from 'react-icons/hi'

export default function Showcase() {
  const [isOn, setIsOn] = useState(false)
  const videoSrc = isOn
    ? 'https://goetvalves.eu/video/on.mp4'
    : 'https://goetvalves.eu/video/off.mp4'

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start pt-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671')",
      }}
    >
      {/* Title */}
      <h1 className="text-white text-6xl font-bold uppercase mb-12 tracking-wide">
        SHOWCASE
      </h1>

      {/* Panel Wrapper */}
      <div className="relative w-full max-w-5xl flex flex-col items-end">
        {/* Top-right controls */}
        <div className="flex items-center gap-6 mb-4">
          {/* Animated gear */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              repeat: Infinity,
              duration: isOn ? 1.5 : 4,
              ease: 'linear',
            }}
            className="text-white text-4xl"
          >
            <HiCog />
          </motion.div>

          {/* Power Text */}
          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
              textShadow: isOn
                ? '0 0 8px #0FAFFF, 0 0 16px #0FAFFF'
                : '0 0 0px rgba(0,0,0,0)',
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white font-bold text-xl tracking-widest uppercase"
          >
            {isOn ? 'POWER ON' : 'POWER OFF'}
          </motion.span>

          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsOn(!isOn)}
            className="relative w-14 h-14 rounded-full bg-gray-900 border-2 border-gray-700 shadow-lg cursor-pointer flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                boxShadow: isOn
                  ? '0 0 15px 5px #0FAFFF, 0 0 30px 15px #0FAFFF'
                  : '0 0 0px 0px rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.3 }}
              className="absolute w-14 h-14 rounded-full bg-gray-900"
            />
            <motion.div
              animate={{ rotate: isOn ? 45 : 0 }}
              className="w-1 h-5 bg-white rounded-full relative z-10"
            />
            <div className="absolute top-1 w-2 h-2 bg-white rounded-full z-10" />
          </motion.button>
        </div>

        {/* Quantum Console Panel */}
        <div className="relative w-full h-[500px] rounded-3xl">
          {/* Outer frame with glowing corners */}
          <div className="absolute inset-0 rounded-3xl border-4 border-gray-700 pointer-events-none z-30">
            <div className="absolute top-3 left-3 w-6 h-1 bg-[#0FAFFF] rounded animate-pulse" />
            <div className="absolute top-3 right-3 w-6 h-1 bg-[#0FAFFF] rounded animate-pulse" />
            <div className="absolute bottom-3 left-3 w-6 h-1 bg-[#0FAFFF] rounded animate-pulse" />
            <div className="absolute bottom-3 right-3 w-6 h-1 bg-[#0FAFFF] rounded animate-pulse" />
          </div>

          {/* Inner glass frame */}
          <motion.div
            animate={{
              boxShadow: isOn
                ? [
                    '0 0 25px 5px rgba(15,162,255,0.6), 0 0 60px 20px rgba(15,162,255,0.3)',
                    '0 0 35px 10px rgba(15,162,255,0.8), 0 0 70px 25px rgba(15,162,255,0.4)',
                  ]
                : ['0 0 0px 0px rgba(0,0,0,0)'],
            }}
            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2 }}
            className="absolute inset-2 rounded-3xl border border-gray-600 z-20 pointer-events-none"
          />

          {/* Animated scanning overlay */}
          <motion.div
            animate={{
              backgroundPositionX: ['0px', '300px'],
              backgroundPositionY: ['0px', '300px'],
            }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,#0FAFFF, #0FAFFF 1px, transparent 1px, transparent 25px)] opacity-20 z-25"
          />

          {/* Glowing holographic lines */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 border-t border-b border-[#0FAFFF] rounded-3xl z-25"
          />

          {/* Video */}
          <video
            key={videoSrc}
            src={videoSrc}
            className="w-full h-full object-cover rounded-3xl relative z-10"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  )
}
