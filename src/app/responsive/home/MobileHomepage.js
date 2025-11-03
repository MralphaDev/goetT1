'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { Russo_One } from 'next/font/google';
import ContactPage from '../../[locale]/Contact/page';
import CardCarousel from './CardCarousel';
import homeValve from '../../../../public/img/homeValve.png';
import home2 from '../../../../public/img/home2.png';
const russo = Russo_One({ subsets: ['latin'], weight: '400' });

export default function HomepagePC() {
  const sectionsCount = 3; // hero, cards, contact
  const [current, setCurrent] = useState(0);
  const controls = useAnimation();
  const heroTextControls = useAnimation();
  const cardControls = useAnimation();
  const contactControls = useAnimation();

  let wheelTimeout = null;

  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const contactRef = useRef(null);

  // Full page scroll on wheel
  const handleWheel = (e) => {
    e.preventDefault();
    if (wheelTimeout) return;
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800);

    if (e.deltaY > 0) setCurrent((prev) => Math.min(prev + 1, sectionsCount - 1));
    else setCurrent((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Animate container scroll
  useEffect(() => {
    controls.start({ y: `-${current * 100}vh`, transition: { duration: 0.8, ease: 'easeInOut' } });
  }, [current]);

  // Prevent default body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Hero text animation
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) heroTextControls.start('visible');
        else heroTextControls.start('hidden');
      },
      { threshold: 0.3 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const heroTextVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  // Card section animation
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) cardControls.start('visible');
        else cardControls.start('hidden');
      },
      { threshold: 0.3 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Contact section animation
  useEffect(() => {
    if (!contactRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) contactControls.start('visible');
        else contactControls.start('hidden');
      },
      { threshold: 0.3 }
    );
    observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  const contactVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <motion.div animate={controls} className="relative">

        {/* SECTION 0 - Hero */}
        <section ref={heroRef} className="h-screen w-full relative overflow-hidden">
          <img
            src="https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671"
            alt="Background"
            className="w-full h-full object-cover"
          />

          <motion.img
            src={homeValve.src}
            alt="Foreground"
            className="absolute object-contain z-10 w-90 left-10 top-37"
            animate={{ rotate: [-2, 1, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
            <motion.img
            src={home2.src}
            alt="Foreground"
            className="absolute object-contain z-10 w-30 right-46 top-75"
            animate={{ rotate: [-2, 1, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-20 bottom-16 z-20"
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

        {/* SECTION 1 - Card Carousel */}
        <section ref={cardRef} className="h-screen w-full flex items-center justify-center bg-gray-50">
          <motion.div initial="hidden" animate={cardControls} variants={cardVariants} className="w-full max-w-xl">
            <CardCarousel />
          </motion.div>
        </section>

        {/* SECTION 2 - Contact */}
        <section ref={contactRef} className="pt-30 h-screen w-full flex items-center justify-center bg-white">
          <motion.div initial="hidden" animate={contactControls} variants={contactVariants} className="w-full max-w-3xl p-8">
            <ContactPage />
          </motion.div>
        </section>

      </motion.div>
    </div>
  );
}
