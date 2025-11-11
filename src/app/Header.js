"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { items } from "./[locale]/Product-login/Product1/items";
import Link from "next/link";
import BurgerMenu from './responsive/home/BurgerMenu';
import Loggout from '../app/[locale]/Product-login/loggout'

export default function Header() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const links = [
    { name: "Goetvalve", href: `/${locale}/` },
    { name: "Company", href: `/${locale}/Company` },
    { name: "Products", href: `/${locale}/Product-login/Product1` },
    { name: "Applications", href: `/${locale}/Applications` },
    { name: "Service&Support", href: `/${locale}/Service` },
    { name: "Contact", href: `/${locale}/Contact` },
  ];

  // Update suggestions as user types
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = items
      .map((item, index) => ({ ...item, index }))
      .filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.serialNum.toLowerCase().includes(query.toLowerCase()) ||
        item.category.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      )
      .slice(0, 5);
    setSuggestions(matches);
    setHighlightIndex(-1);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (highlightIndex >= 0 && suggestions[highlightIndex]) {
      router.push(`/${locale}/Product-login/Product1/${suggestions[highlightIndex].index}`);
    } else if (suggestions.length > 0) {
      router.push(`/${locale}/Product-login/Product1/${suggestions[0].index}`);
    } else {
      alert("No product found!");
    }
    setQuery("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-20 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        {/* Logo */}
        <motion.img
          src="/tm2.png"
          alt="Logo"
          className="h-20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Search Bar */}
        <motion.form
          className="relative flex-1 mx-10"
          onSubmit={handleSearch}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 1000 }}
        >
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-2.5 pl-5 pr-24 rounded-3xl bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition-all duration-300 placeholder-gray-400 text-base"
            whileFocus={{ scale: 1.01, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
          />
          <motion.button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 px-5 py-1.5 rounded-full shadow-lg text-base"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Go
          </motion.button>

          {/* Autocomplete Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-2xl overflow-hidden z-50 border border-gray-200"
              >
                {suggestions.map((item, idx) => (
                  <motion.li
                    key={item.serialNum + idx}
                    onClick={() => router.push(`/${locale}/Product-login/Product1/${item.index}`)}
                    whileHover={{ scale: 1.02, backgroundColor: "#eff6ff" }}
                    className={`px-5 py-3 cursor-pointer transition-all duration-150 font-medium text-gray-700 ${idx === highlightIndex ? "bg-blue-50 text-blue-600" : ""}`}
                  >
                    {item.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-gray-500 font-light">
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
        

          <Loggout/>

    </header>
  );
}
