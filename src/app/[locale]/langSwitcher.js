"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  const changeLocale = (locale) => {
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <div className="fixed right-5 top-[55%] z-50 flex flex-col items-center group">
      {/* Globe Button */}
      <div className=" w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-110 cursor-pointer">
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

      {/* Locale Options - show on hover */}
      <div className="flex flex-col mt-20 space-y-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
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
  );
}
