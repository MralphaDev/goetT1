import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Dropdown = ({ scenario, setScenario, scenarioTableMap, setCurrentTable }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value) => {
    setScenario(value);
    setCurrentTable(scenarioTableMap[value]);
    setShowDropdown(false);
  };

  const scenarios = [
    { value: "solenoid", label: "Solenoid" },
    { value: "pressure-actuated", label: "Pressure Actuated" },
    { value: "liq-nitro-non-return", label: "Liq-Nitro Non-Return" },
    { value: "liq-nitro-filter", label: "Liq-Nitro Filter" },
    { value: "safety-valves", label: "Safety Valves" },
  ];

  return (
    <div className="absolute top-5 left-[17vw] z-50">
      <button
        onClick={() => setShowDropdown(true)}
        className=" flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 shadow-md hover:shadow-lg bg-white hover:bg-gray-100 transition-all"
      >
        <span className="font-medium text-gray-700">{scenario}</span>
        {/* Simple down arrow icon */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full bg-black text-white p-6 z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] bg-[length:400%_400%] blur-3xl opacity-60"></div>

            <h2 className="text-2xl font-bold mb-8">Choose Scenario</h2>
            {scenarios.map((s, index) => (
              <motion.button
                key={s.value}
                onClick={() => handleSelect(s.value)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-lg mb-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg w-64 text-center font-semibold tracking-wide backdrop-blur-md"
              >
                {s.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
