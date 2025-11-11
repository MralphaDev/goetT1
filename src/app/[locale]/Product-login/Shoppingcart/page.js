"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ShoppingCart({ cart = [] }) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [localCart, setLocalCart] = useState([]);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const checkoutPath = `/${locale}/Product-login/checkout`;

  // Load login + cart state
  useEffect(() => {
    if (typeof window === "undefined") return;

    const logged = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(logged);

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setLocalCart(storedCart);
  }, [cart]); // refresh when prop changes

  //if (!isLoggedIn) return null;

  const totalItems = localCart.reduce((sum, item) => sum + item.quantity, 0);

  /** ✅ Remove Item + Update State + Refresh UI */
  const removeFromCart = (name) => {
    const updated = localCart.filter((item) => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(updated));
    setLocalCart(updated);
  };

  return (
    <>
      {/* Cart Icon Button */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[9999]">
        <motion.button
          onHoverStart={() => setOverlayOpen(true)}
          whileHover={{ scale: 1.1 }}
          className="relative w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
              {totalItems}
            </span>
          )}
          {/* Cart Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l3.6 7.59a1 1 0 00.92.59h7.86a1 1 0 00.92-.59L21 6H7" />
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
          </svg>
        </motion.button>
      </div>

      {/* Cart Curtain */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            {/* Close */}
            <button className="absolute top-4 right-6 text-black text-2xl font-bold"
              onClick={() => setOverlayOpen(false)}>
              ×
            </button>

            <div className="flex flex-col items-center justify-center flex-grow px-6">
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center w-full max-w-lg"
              >
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-4xl md:text-5xl font-extrabold text-black mb-6"
                >
                  VIEW YOUR CART
                </motion.h1>

                {/* Cart Items */}
<div className="w-full max-h-[70vh] overflow-y-auto border border-gray-200 rounded-xl p-6 shadow-inner bg-gray-50">
  {localCart.length === 0 ? (
    <p className="text-gray-500 text-center py-10 text-lg">
      Nothing added yet 😶
    </p>
  ) : (
    localCart.map((item, i) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 + i * 0.05, duration: 0.4 }}
        className="flex justify-between items-center bg-white px-4 py-3 rounded-lg mb-3 shadow-sm"
      >
        <span className="font-medium text-gray-800 text-lg">{item.name}</span>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800 text-lg">x{item.quantity}</span>

          {/* ✅ Remove individual item */}
          <button
            onClick={() => removeFromCart(item.name)} // only removes this item
            className="text-red-600 hover:text-red-800 text-xl font-bold"
          >
            ×
          </button>
        </div>
      </motion.div>
    ))
  )}
</div>

                {/* Checkout Button */}
                <Link href={checkoutPath} className="mt-8 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Checkout →
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
