"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const flags = {
  en: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
  de: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  it: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
};



export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const changeLocale = (locale) => {
    segments[1] = locale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    } catch {
      setCartCount(0);
    }
  }, []);

  return (
    <div className="fixed bottom-35 right-4 z-50 flex items-center space-x-4">
      {/* Language button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-white rounded-full shadow-lg hover:bg-blue-500 transition"
        >
          <img src={flags[currentLocale]} alt={currentLocale} className="w-6 h-4" />
          <span className="font-semibold uppercase text-black">{currentLocale}</span>
        </button>

        {open && (
          <div className="absolute w-26 top-0 right-22 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-1">
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
                <img src={flags[loc]} alt={loc} className="w-6 h-4" />
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
