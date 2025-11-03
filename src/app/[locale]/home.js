'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomePagePC from '../responsive/home/HomePagePC'
import TabletHompage from '../responsive/home/TabletHompage'
import HomepageMobile from '../responsive/home/MobileHomepage'

export default function Homepage() {
  const [device, setDevice] = useState('pc')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= 700) setDevice('mobile')
      else if (width <= 1024) setDevice('tablet')
      else setDevice('pc')
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    const timer = setTimeout(() => setLoading(false), 3000)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1.5, delay: 2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute w-full h-full bg-white overflow-hidden">
              <motion.div
                className="w-full h-full bg-white"
                style={{
                  borderBottomLeftRadius: '50% 15%',
                  borderBottomRightRadius: '50% 15%',
                }}
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.h1
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-5xl md:text-6xl font-light tracking-[0.15em] text-gray-800 uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Welcome to
              </motion.h1>

              <motion.h2
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="text-6xl md:text-7xl font-semibold tracking-widest text-black mt-3 uppercase"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Goetvalve
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div>
          {device === 'pc' && <HomePagePC />}
          {device === 'tablet' && <TabletHompage />}
          {device === 'mobile' && <HomepageMobile />}
        </div>
      )}
    </>
  )
}
