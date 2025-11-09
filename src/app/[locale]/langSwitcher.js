"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const flags = {
  en: "🇬🇧",
  de: "🇩🇪",
  it: "🇮🇹",
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
    // check cart from localStorage
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    } catch {
      setCartCount(0);
    }
  }, []);

  return (
    <div className="fixed top- right-4 z-50 flex items-center space-x-4">


      {/* Language button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-500 transition"
        >
          <span className="text-lg">{flags[currentLocale]}</span>
          <span className="font-semibold uppercase">{currentLocale}</span>
        </button>

        {open && (
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-1">
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
  );
}
