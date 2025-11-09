"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Russo_One } from "next/font/google";

const russo = Russo_One({ subsets: ["latin"], weight: "400" });

const cards = [
  {
    href: "/de/Product-login/Product1",
    img: "/img/cc1.jpg", // from public/cc1.jpg
    label: "Products",
  },
  {
    href: "/de/Applications",
    img: "/img/cc2.jpg",
    label: "Applications",
  },
  {
    href: "/de/Service",
    img: "/img/cc3.jpg",
    label: "Service & Support",
  },
];

export default function CardCarousel() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const swipeConfidenceThreshold = 10000;

  const paginate = (newDirection) => {
    setIndex(([prevIndex]) => [
      (prevIndex + newDirection + cards.length) % cards.length,
      newDirection,
    ]);
  };

  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          className="h-[65vh] w-90 flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white relative"
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
            if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            } else if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            }
          }}
        >
          <Link href={cards[index].href} className="relative w-full h-2/3">
            <motion.img
              src={cards[index].img}
              alt={cards[index].label}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>
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
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, 0])}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-gray-800 scale-125" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
