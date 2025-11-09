"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import ShoppingCart from "../../[locale]/Product-login/shoppingCart";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const flags = { en: "🇬🇧", de: "🇩🇪", it: "🇮🇹" };
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  const changeLocale = (locale) => {
    segments[1] = locale;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const links = [
    { href: "/de/Product-login/Product1", label: "Products" },
    { href: "/de/Applications", label: "Applications" },
    { href: "/de/Service", label: "Service & Support" },
    { href: "/de/Company", label: "Company" },
    { href: "/de", label: "Home" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 + 0.2, type: "spring", stiffness: 120, damping: 20 },
    }),
  };

  // Load cart from localStorage + listen for updates
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const handleStorage = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(updatedCart);
    };
    window.addEventListener("cartUpdated", handleStorage);
    return () => window.removeEventListener("cartUpdated", handleStorage);
  }, []);

  return (
    <div className="relative z-50">
      {/* Top bar */}
      <div className="flex justify-between items-center p-4 fixed w-full top-0 left-0 z-50 bg-white text-customBlue shadow-sm">
        <motion.img
          src="/tm2.png"
          alt="Logo"
          className="h-12 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        />

        {/* Burger button */}
        <motion.button
          className="text-3xl font-light cursor-pointer text-customBlue"
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </motion.button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 flex flex-col justify-center items-start bg-white p-12 overflow-auto"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 25 } }}
              exit={{ x: "100%", opacity: 0, transition: { type: "spring", stiffness: 80, damping: 25 } }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-6 right-6 text-3xl text-customBlue cursor-pointer"
                onClick={() => setOpen(false)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>

              {/* Links */}
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full mb-6 relative"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-xl font-light text-customBlue hover:text-[#28A8DE] transition-colors duration-300 uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                  {i < links.length - 1 && (
                    <span className="block h-[1px] bg-gray-200 w-1/3 mt-2"></span>
                  )}
                </motion.div>
              ))}

              {/* Bottom-right icons */}
              <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-4">


                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-500 transition"
                  >
                    <span className="text-lg">{flags[currentLocale]}</span>
                    <span className="font-semibold uppercase">{currentLocale}</span>
                  </button>

                  {langOpen && (
                    <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-1">
                      {["en", "de", "it"].map((loc) => (
                        <button
                          key={loc}
                          onClick={() => changeLocale(loc)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                            currentLocale === loc
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <span>{flags[loc]}</span>
                          {loc.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
