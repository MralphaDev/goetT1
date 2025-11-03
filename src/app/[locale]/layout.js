'use client';

import { NextIntlClientProvider } from "next-intl";
import "../../app/globals.css";
import Footer from "../Footer";
import Header from "../Header";
import BurgerMenu from '../responsive/home/BurgerMenu'; // mobile menu
import { usePathname } from "next/navigation";
import LangSwitcher from "./langSwitcher";
import { useState, useEffect } from "react";
import en from '../../../messages/en.json';
import de from "../../../messages/de.json";
import it from "../../../messages/it.json";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [device, setDevice] = useState('pc'); // 'pc' | 'tablet' | 'mobile'

  // Detect device
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 500) setDevice('mobile');
      else if (width <= 1024) setDevice('tablet');
      else setDevice('pc');
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideHeaderFooter = pathname.includes("/checkout");

  const locale =
    pathname.startsWith("/de") ? "de" :
    pathname.startsWith("/it") ? "it" : "en";

  const messages =
    locale === "de" ? de :
    locale === "it" ? it :
    en;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {!hideHeaderFooter && (
        <>
          {device === 'mobile' && <BurgerMenu />}
          {device === 'tablet' && <BurgerMenu />} 
          {device === 'pc' && <Header />}
        </>
      )}

      <main className="min-h-screen">{children}</main>

      {!hideHeaderFooter && device === 'pc' && <Footer />}

      {/* Only show LangSwitcher if not mobile */}
      {!hideHeaderFooter && device !== 'mobile' && <LangSwitcher />}
    </NextIntlClientProvider>
  );
}
