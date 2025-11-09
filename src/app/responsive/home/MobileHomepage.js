'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Russo_One } from 'next/font/google'
import ContactPage from '../../[locale]/Contact/page'
import CardCarousel from './CardCarousel'
import homeValve from '../../../../public/img/homeValve.png'
import home2 from '../../../../public/img/home2.png'

const russo = Russo_One({ subsets: ['latin'], weight: '400' })

export default function HomepagePC() {
  const sectionsCount = 3
  const [current, setCurrent] = useState(0)
  const controls = useAnimation()
  const heroTextControls = useAnimation()
  const cardControls = useAnimation()
  const contactControls = useAnimation()

  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const cardRef = useRef(null)
  const contactRef = useRef(null)

  let wheelTimeout = null
  let touchStartY = 0

  // desktop scroll
  const handleWheel = (e) => {
    e.preventDefault()
    if (wheelTimeout) return
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800)
    if (e.deltaY > 0) setCurrent((p) => Math.min(p + 1, sectionsCount - 1))
    else setCurrent((p) => Math.max(p - 1, 0))
  }

  // mobile touch
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    if (wheelTimeout) return
    const deltaY = touchStartY - e.touches[0].clientY
    if (Math.abs(deltaY) < 40) return
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800)
    if (deltaY > 0) setCurrent((p) => Math.min(p + 1, sectionsCount - 1))
    else setCurrent((p) => Math.max(p - 1, 0))
    touchStartY = e.touches[0].clientY
  }

  // attach to container, not window
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    controls.start({
      y: `-${current * 100}vh`,
      transition: { duration: 0.8, ease: 'easeInOut' },
    })
  }, [current])

  // disable body scroll on desktop only
  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.overflow = 'hidden'
      return () => (document.body.style.overflow = 'auto')
    }
  }, [])

  // intersection observers
  const setupObserver = (ref, controls) => {
    useEffect(() => {
      if (!ref.current) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) controls.start('visible')
          else controls.start('hidden')
        },
        { threshold: 0.3 }
      )
      obs.observe(ref.current)
      return () => obs.disconnect()
    }, [])
  }

  setupObserver(heroRef, heroTextControls)
  setupObserver(cardRef, cardControls)
  setupObserver(contactRef, contactControls)

  const heroTextVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const contactVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden relative touch-none">
      <motion.div animate={controls} className="relative">

        {/* Section 0 */}
        <section ref={heroRef} className="h-screen w-full relative overflow-hidden">
          <img
            src="https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671"
            alt="bg"
            className="w-full h-full object-cover"
          />
          <motion.img
            src={homeValve.src}
            alt="valve"
            className="absolute object-contain z-10 w-90 left-0 top-55"
            animate={{ rotate: [-2, 1, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <motion.img
            src={home2.src}
            alt="pipe"
            className="absolute object-contain z-10 w-30 right-20 bottom-78"
            animate={{ rotate: [-2, 1, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-5 bottom-23 z-20"
            initial="hidden"
            animate={heroTextControls}
            variants={heroTextVariants}
          >
            <h1 className={`text-6xl font-bold text-white drop-shadow-lg ${russo.className}`}>
              CRYOGENIC VALVE
            </h1>
            <p className={`text-3xl font-semibold mt-2 text-lightBlue drop-shadow-md ${russo.className}`}>
              FOR INDUSTRIAL APPLICATIONS
            </p>
          </motion.div>
        </section>

        {/* Section 1 */}
        <section ref={cardRef} className="h-screen w-full flex items-center justify-center bg-gray-50">
          <motion.div initial="hidden" animate={cardControls} variants={cardVariants} className="w-full max-w-xl">
            <CardCarousel />
          </motion.div>
        </section>

        {/* Section 2 */}
        <section ref={contactRef} className="pt-30 h-screen w-full flex items-center justify-center bg-white">
          <motion.div initial="hidden" animate={contactControls} variants={contactVariants} className="w-full max-w-3xl p-8">
            <ContactPage />
          </motion.div>
        </section>
      </motion.div>
    </div>
  )
}
