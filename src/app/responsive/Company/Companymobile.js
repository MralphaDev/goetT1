'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Russo_One } from 'next/font/google';
import homeValve from '../../../../public/img/homeValve.png';
import home2 from '../../../../public/img/home2.png';

const russo = Russo_One({ subsets: ['latin'], weight: '400' });

export default function CompanyMobile() {
  const t = useTranslations("Company");
  const description = t("description");

  // Split into sentences
  const rawSentences = description.split('.').map(s => s.trim()).filter(Boolean);

  // Group 1-2 sentences per paragraph
  const paragraphs = [];
  for (let i = 0; i < rawSentences.length; i += 2) {
    paragraphs.push(rawSentences.slice(i, i + 2).join('. ') + '.');
  }

  // Split paragraphs into 4 pages
  const totalPages = 4;
  const paragraphsPerPage = Math.ceil(paragraphs.length / totalPages);
  const pagesContent = [];
  for (let i = 0; i < paragraphs.length; i += paragraphsPerPage) {
    pagesContent.push(paragraphs.slice(i, i + paragraphsPerPage));
  }

  const [current, setCurrent] = useState(0);
  const scrollLock = useRef(false);
  let touchStartY = 0;

  const handleTouchStart = e => touchStartY = e.touches[0].clientY;
  const handleTouchEnd = e => {
    if (scrollLock.current) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) < 30) return;

    scrollLock.current = true;
    if (deltaY > 0) setCurrent(prev => Math.min(prev + 1, pagesContent.length));
    else setCurrent(prev => Math.max(prev - 1, 0));

    setTimeout(() => scrollLock.current = false, 700);
  };

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const pageStyle = "h-screen w-screen flex flex-col justify-center items-center px-6 sm:px-12 text-white relative bg-[url('https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671')] bg-cover bg-center";
  const textVariantsLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const textVariantsRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };

  return (
    <div className="h-screen w-screen relative ">
      <motion.div
        style={{ transform: `translateY(-${current * 100}vh)` }}
        className="relative h-full w-full transition-transform duration-700 ease-in-out overflow-hidden"
      >

        {/* PAGE 1 - Company Name */}
        <section className={pageStyle}>
          <motion.h1 whileInView="visible" initial="hidden" variants={textVariantsLeft} className={`text-7xl sm:text-8xl font-extrabold ${russo.className} text-center mb-4`}>
            GOETVALVE
          </motion.h1>
          <motion.h2 whileInView="visible" initial="hidden" variants={textVariantsRight} className={`text-4xl sm:text-5xl font-semibold ${russo.className} text-center`}>
            GMBH
          </motion.h2>

          
          <motion.img src={home2.src} alt="Home2" className="absolute w-24 sm:w-32 bottom-20 right-12" animate={{ rotate: [-2,1,-2] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
        </section>

        {/* PAGES 2-4 - Description */}
        {pagesContent.map((pageParas, idx) => (
          <section key={idx} className={pageStyle}>
            {pageParas.map((para, pIdx) => (
              <motion.p
                key={pIdx}
                whileInView="visible"
                initial="hidden"
                variants={(pIdx % 2 === 0) ? textVariantsLeft : textVariantsRight}
                className="text-sm sm:text-base text-justify leading-relaxed mt-4"
              >
                {para}
              </motion.p>
            ))}

           
            <motion.img src={home2.src} alt="Home2" className="absolute w-24 sm:w-32 bottom-20 right-12" animate={{ rotate: [-2,1,-2] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
          </section>
        ))}

      </motion.div>
    </div>
  );
}
