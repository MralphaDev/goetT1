"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Russo_One } from "next/font/google";

const russo = Russo_One({ subsets: ["latin"], weight: "400" });

const cards = [
  {
    href: "/de/Product-login/Product1",
    img: "http://www.goetvalve.eu/images/cc1.jpg",
    label: "Products",
  },
  {
    href: "/de/Applications",
    img: "http://www.goetvalve.eu/images/cc2.jpg",
    label: "Applications",
  },
  {
    href: "/de/Service",
    img: "http://www.goetvalve.eu/images/cc3.jpg",
    label: "Service & Support",
  },
];

export default function CardCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % cards.length);
  const prev = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="h-[65vh] w-90 flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image */}
          <Link href={cards[index].href} className="relative w-full h-2/3">
            <motion.img
              src={cards[index].img}
              alt={cards[index].label}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>

          {/* Text container */}
          <div className="flex-1 flex items-center justify-center p-4">
            <h2
              className={`text-2xl md:text-3xl font-semibold text-center ${russo.className}`}
            >
              {cards[index].label}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-gray-800 scale-125" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>

     
    </div>
  );
}
