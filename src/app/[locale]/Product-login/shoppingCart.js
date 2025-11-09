"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ShoppingCart({ cart = [] }) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  }, [cart]);

  if (!isLoggedIn) return null;

  const totalItems = localCart.reduce((sum, item) => sum + item.quantity, 0);

  /** ✅ Remove Item + Update State + Refresh UI */
  const removeFromCart = (name) => {
    const updated = localCart.filter((item) => item.name !== name);
    setLocalCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  /** ✅ Increase Quantity */
  const increaseQuantity = (name) => {
    const updated = localCart.map((item) =>
      item.name === name ? { ...item, quantity: item.quantity + 1 } : item
    );
    setLocalCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
/** ✅ Decrease Quantity (min = 1, no removal) */
const decreaseQuantity = (name) => {
  const updated = [...localCart];
  const idx = updated.findIndex((i) => i.name === name);

  if (idx < 0) return; // item not found

  if (updated[idx].quantity > 1) {
    updated[idx].quantity -= 1;
  }

  setLocalCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};


  return (
    <>
{/* Cart Icon Button */}
<div
  className={`fixed right-5 z-[9999] ${
    window.innerWidth < 768
      ? "bottom-20" // bottom-right on mobile
      : "top-1/2 -translate-y-1/2" // center vertical on desktop
  }`}
>
  {window.innerWidth < 768 ? (
    <motion.button
      onClick={() => setOverlayOpen(true)}
      whileHover={{ scale: 1.1 }}
      className="relative w-12 h-12 bg-gray-200 text-white rounded-full flex items-center justify-center shadow-lg"
    >
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
          {totalItems}
        </span>
      )}
      <span className="text-2xl">🛒</span>
    </motion.button>
  ) : (
<button
  onClick={() => setOverlayOpen(true)}
  className="relative w-15 h-15 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg"
>
  {/* Red badge */}
  {totalItems > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
      {totalItems}
    </span>
  )}

  {/* Cart SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l3.6 7.59a1 1 0 00.92.59h7.86a1 1 0 00.92-.59L21 6H7"
    />
    <circle cx="9" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
  </svg>
</button>

  )}
</div>



      {/* Cart Curtain */}
          <AnimatePresence>
  {overlayOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 backdrop-blur-xl bg-white/20 flex justify-center items-center p-4"
    >
      {/* Slide Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-white/30 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                   border border-white/40 px-6 pt-16 pb-8 flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => setOverlayOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/60 
                     rounded-full text-xl font-bold shadow-md hover:bg-white transition"
        >
          ×
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6 tracking-tight">
          Your Cart
        </h1>

        {/* Items Container */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {localCart.length === 0 ? (
            <p className="text-gray-600 text-center py-12 text-lg">
              Your cart is empty 😶
            </p>
          ) : (
            localCart.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center p-4 rounded-2xl bg-white/50
                           border border-white/50 shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]"
              >
                <span className="font-medium text-gray-900 text-sm sm:text-base">
                  {item.name}
                </span>

                {/* Qty Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.name)}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-gray-100 active:scale-95 shadow
                               flex justify-center items-center text-lg font-semibold"
                  >
                    −
                  </button>

                  <div className="min-w-[32px] text-center font-semibold text-gray-900">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => increaseQuantity(item.name)}
                    className="w-8 h-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 
                               active:scale-95 shadow flex justify-center items-center text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Checkout */}
        {localCart.length > 0 && (
          <Link href={checkoutPath} className="mt-6 w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-2xl bg-blue-600 text-white font-semibold 
                         shadow-lg hover:bg-blue-700 transition text-lg"
            >
              Checkout →
            </motion.button>
          </Link>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
}
