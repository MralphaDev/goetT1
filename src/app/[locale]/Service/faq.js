import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Settings, ArrowDownCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQOnboarding() {
  const t = useTranslations('faq');
  const [index, setIndex] = useState(0);

  const pages = [
    'current',
    'heat',
    'burn',
    'cycle',
    'temp'
  ];

  const next = () => index < pages.length - 1 && setIndex(index + 1);
  const prev = () => index > 0 && setIndex(index - 1);

  const key = pages[index];

  return (
    <div
      className="h-screen w-screen flex items-center justify-center text-white relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg)",
        backgroundSize: "cover"
      }}
    >
      {/* onboarding guidance outside card */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-12 text-cyan-300 text-sm flex items-center gap-2"
      >
        <ArrowDownCircle className="w-5 h-5" />
        <span>{t('flowHint')}</span>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-[80%] max-w-5xl p-12 rounded-3xl bg-gradient-to-br from-[#0b3c5d]/90 to-[#021b2f]/90 shadow-2xl"
        >
          {/* step 1: title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            >
              <Settings className="w-8 h-8 text-cyan-300" />
            </motion.div>
            <h1 className="text-3xl font-bold">{t(`${key}.title`)}</h1>
          </motion.div>

          {/* step 2: story */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-cyan-200 mb-8 italic"
          >
            {t(`${key}.story`)}
          </motion.p>

          {/* step 3: content */}
          <div className="space-y-4 text-base leading-relaxed">
            {[1, 2, 3].map((i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className={i === 3 ? 'text-cyan-300' : ''}
              >
                {t(`${key}.p${i}`)}
              </motion.p>
            ))}
          </div>

          {/* step 4: table */}
          {key === 'temp' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-10 overflow-hidden rounded-xl border border-cyan-400/30"
            >
              <table className="w-full text-sm">
                <thead className="bg-cyan-900/40">
                  <tr>
                    <th className="p-3">{t('temp.table.class')}</th>
                    <th className="p-3">{t('temp.table.nominal')}</th>
                    <th className="p-3">{t('temp.table.permissible')}</th>
                    <th className="p-3">{t('temp.table.rise')}</th>
                  </tr>
                </thead>
                <tbody className="bg-cyan-950/40">
                  {['A', 'B', 'F', 'H'].map((c) => (
                    <tr key={c}>
                      <td className="p-3">{c}</td>
                      <td className="p-3">{t(`temp.table.${c}.nominal`)}</td>
                      <td className="p-3">{t(`temp.table.${c}.permissible`)}</td>
                      <td className="p-3">{t(`temp.table.${c}.rise`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* navigation */}
          <div className="flex justify-between items-center mt-12">
            <button onClick={prev} className="opacity-70 hover:opacity-100">
              <ChevronUp size={36} />
            </button>
            <span className="text-sm text-cyan-300">{index + 1} / {pages.length}</span>
            <button onClick={next} className="opacity-70 hover:opacity-100">
              <ChevronDown size={36} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
