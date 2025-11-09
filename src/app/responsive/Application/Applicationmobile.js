'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ subsets: ['latin'], weight: '400' });

const cards = [
  { href: '/de/Product-login/Product1', img: 'http://www.goetvalve.eu/uploadfiles/c1.jpg', label: 'Production Line' },
  { href: '/de/Applications', img: 'http://www.goetvalve.eu/uploadfiles/c2.jpg', label: 'Tank Filling' },
  { href: '/de/Service', img: 'http://www.goetvalve.eu/uploadfiles/c3.jpg', label: 'Quick-Freezing Machine' },
  { href: '/de/Service', img: 'http://www.goetvalve.eu/uploadfiles/c4.jpg', label: 'Pipeline Control' },
  { href: '/de/Service', img: 'http://www.goetvalve.eu/uploadfiles/c5.jpg', label: 'CNC Cooling' },
  { href: '/de/Service', img: 'http://www.goetvalve.eu/uploadfiles/c6.jpg', label: 'Food Quick Freezer' },
];

export default function ApplicationMobile() {
  const [current, setCurrent] = useState(0); // section index
  const controls = useAnimation();
  const containerRef = useRef(null);

  let touchStartY = 0;
  let wheelTimeout = null;

  // full-page swipe
  const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
  const handleTouchMove = (e) => {
    if (wheelTimeout) return;
    const deltaY = touchStartY - e.touches[0].clientY;
    if (Math.abs(deltaY) < 50) return;
    wheelTimeout = setTimeout(() => (wheelTimeout = null), 800);
    if (deltaY > 0) setCurrent((p) => Math.min(p + 1, 2)); // 3 sections
    else setCurrent((p) => Math.max(p - 1, 0));
    touchStartY = e.touches[0].clientY;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    controls.start({ y: `-${current * 100}vh`, transition: { duration: 0.8, ease: 'easeInOut' } });
  }, [current, controls]);

  // Card carousel
  const [cardIndex, setCardIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const swipeConfidence = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDir) => {
    setDirection(newDir);
    setCardIndex((prev) => (prev + newDir + cards.length) % cards.length);
  };

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden relative bg-gray-50">
      <motion.div animate={controls} className="relative h-full">

        {/* Section 0: Big Application Text */}
        <section
          className="h-screen w-full flex flex-col items-center justify-center text-white bg-cover bg-center"
          style={{ backgroundImage: "url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)" }}
        >
          <h1 className={`text-5xl font-bold text-center ${russo.className}`}>APPLICATIONS</h1>
          <p className={`text-xl mt-5 text-center ${russo.className}`}>
            Discover our solutions 
          </p>
        </section>


        {/* Section 1: Cards */}
        <section className="h-screen w-full flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={cardIndex}
              className="w-80 h-[60vh] bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
              transition={{ duration: 0.6 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidence) paginate(1);
                else if (swipe > swipeConfidence) paginate(-1);
              }}
            >
              <Link href={cards[cardIndex].href} className="relative w-full h-2/3">
                <motion.img
                  src={cards[cardIndex].img}
                  alt={cards[cardIndex].label}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </Link>
              <div className="flex-1 flex items-center justify-center p-4">
                <h2 className={`text-xl font-semibold text-center ${russo.className}`}>{cards[cardIndex].label}</h2>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bouncing Down Arrow */}
          <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white text-4xl"
            onClick={() => setCurrent((prev) => Math.min(prev + 1, 2))} // 2 = last section index
          >
            &#x2193;
          </div>

        </section>

      </motion.div>
    </div>
  );
}
