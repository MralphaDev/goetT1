"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

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

  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  const changeLocale = (locale) => {
    segments[1] = locale;
    router.push(segments.join("/"));
  };

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
              className="fixed inset-0 z-40 flex flex-col justify-center items-start bg-white p-12 overflow-hidden"
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

              {/* Links with separators */}
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

              {/* Floating globe language switcher */}
              <div className="absolute top-25 right-1 group">
                {/* Globe Button */}
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-110 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v20m0-10H2m20 0h-4m-8 0a6 6 0 0112 0 6 6 0 01-12 0z"
                    />
                  </svg>
                </div>

                {/* Locale buttons on hover */}
                <div className="flex flex-col mt-2 space-y-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                  {["en", "de", "it"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => changeLocale(loc)}
                      className={`px-4 py-2 rounded-lg font-semibold shadow-md transition
                        ${currentLocale === loc ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
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
