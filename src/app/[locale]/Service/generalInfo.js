import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const generalInfo = () => {
  const content = [
    {
      title: 'Solenoid Valve Assembly',
      subtitle: 'DIRECT ACTING SOLENOID VALVE',
      items: [
        '1. Solenoid coil',
        '2. Solenoid base (or shaft)',
        '3. Core',
        '4. Spring',
        '5. Disc seal',
        '6.  Valve body',
      ],
      img: 'https://www.goetvalves.eu/image/v1.png',
      imgRight: true,
    },
    {
      title: '2/2 CLOSED WHEN DE-ENERGISED (NC) DIRECT ACTING',
      description:
        'When the coil is energised the valve opens. No minimum operating pressure required. Max pressure depends on orifice and coil power.',
      img: 'https://www.jaksa.si/wp-content/uploads/2016/01/Function-modes_01.gif',
    },
    {
      title: '2/2 CLOSED WHEN DE-ENERGISED (NC) COMBINED OPERATION',
      description:
        'Combines direct acting and pilot. Diaphragm attached to solenoid core, allows high flow near 0 bar.',
      img: 'https://www.jaksa.si/wp-content/uploads/2016/02/nacini4.gif',
    },
  ]

  const [index, setIndex] = useState(0)
  const prevSlide = () => setIndex(index === 0 ? content.length - 1 : index - 1)
  const nextSlide = () => setIndex(index === content.length - 1 ? 0 : index + 1)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage:
          'url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-6xl md:text-6xl text-white font-extrabold mb-12 drop-shadow-lg text-center">
        General Information
      </h1>

      <div className="relative w-full max-w-4xl">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-12 transform -translate-y-1/2 text-white text-5xl z-10 hover:text-blue-300"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-12 transform -translate-y-1/2 text-white text-5xl z-10 hover:text-blue-300"
        >
          <FaArrowRight />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`p-8 bg-white/20 backdrop-blur-md rounded-xl shadow-lg text-white flex flex-col gap-6 ${
              content[index].imgRight ? 'md:flex-row-reverse items-center' : 'md:flex-col items-center'
            }`}
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-semibold text-center md:text-left">
                {content[index].title}
              </h2>
              {content[index].subtitle && (
                <h3 className="text-xl md:text-2xl text-blue-200 text-center md:text-left">
                  {content[index].subtitle}
                </h3>
              )}
              {content[index].items && (
                <ul className="list-disc list-inside text-gray-100 text-left mt-2 text-lg md:text-xl">
                  {content[index].items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {content[index].description && (
                <p className="text-gray-100 mt-2 text-lg md:text-xl">{content[index].description}</p>
              )}
            </div>
            {content[index].img && (
              <img
                src={content[index].img}
                alt="Diagram"
                className="w-full max-w-md md:max-w-lg mt-4 md:mt-0 rounded-lg shadow-lg"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default generalInfo
