"use client";

import dynamic from "next/dynamic";
import {React,useEffect }from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 动态加载 ThirdwebProvider，禁用 SSR
const ThirdwebProvider = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ThirdwebProvider),
  { ssr: false }
);

export default function RootLayout({ children }) {
  useEffect(() => {
    const block = (e) => {
      if (e.target.tagName === "IMG"|| e.target.tagName === "VIDEO") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
