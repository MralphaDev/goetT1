"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [position, setPosition] = useState("");
  const [code, setCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);
  const [popup, setPopup] = useState(null);

  const [showGoet, setShowGoet] = useState(false);

  const locale = pathname?.split("/")[1] || "en";

  const showPopup = (message, type = "success") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 1000);
  };

  const handleSubmit = async () => {
    if (!password|| !email || (isSignUp && !name) || (isSignUp && !companyName) || (isSignUp && !companyWebsite) || (isSignUp && !companyAddress) || (isSignUp && !position)) {
      showPopup("there are missing fields", "error");
      return;
    }

if (isSignUp && companyWebsite) {
  // 提取公司网站的域名（去掉 http:// https:// www.）
  const websiteDomain = companyWebsite
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]  // 去掉路径
    .toLowerCase();

  // 提取 email 的域名（@ 后面部分）
  const emailDomain = email.split("@")[1]?.toLowerCase();

  if (emailDomain !== websiteDomain) {
    showPopup("please enter correct company email or company website", "error");
    return;
  }
}


   

    const body = { password, email, isSignUp, step, name, companyName, companyWebsite, companyAddress, position };
    if (isSignUp && step === 2) body.code = code;

    let res, data;
    try {
      res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      data = await res.json();
    } catch {
      showPopup("Network or server error", "error");
      return;
    }

    if (res.ok) {
      if (isSignUp && step === 1) {
        showPopup(data.message, "success");
        setStep(2);
      } else if (data.user) {
        setLoggedIn(true);
        setUser(data.user);
        showPopup(data.message, "success");
        setStep(1);
        setCode("");

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show GOETVALVE 0.5s after WELCOME TO
        setTimeout(() => setShowGoet(true), 2000);
      }
    } else {
      showPopup(data.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (showGoet) {
      // Redirect 0.5s after GOETVALVE appears
      const redirectTimeout = setTimeout(() => {
        window.location.reload();
        window.location.href = `/${locale}/Product-login/Product1`;
      }, 1200);
      return () => clearTimeout(redirectTimeout);
    }
  }, [showGoet, locale]);

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setPassword("");
    setEmail("");
    setCode("");
    setStep(1);
    setShowGoet(false);
    showPopup("Logged out", "success");
  };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 relative flex flex-col items-center justify-center bg-white overflow-hidden">
      {popup && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className={`max-w-md w-11/12 px-6 py-4 rounded-lg shadow-lg text-center text-lg font-semibold 
        ${popup.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
      `}
    >
      {popup.message}
    </div>
  </div>
)}

      <AnimatePresence mode="wait">
        {!loggedIn ? (
          <motion.div
            key="loginForm"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-6 items-center sm:items-start"
          >
            {/* GOETVALVE Logo */}
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="240" height="48" viewBox="0 0 240 48" role="img" aria-label="GOET logo">
                <text
                  x="0"
                  y="35"
                  fontFamily="Arial Black, Helvetica, sans-serif"
                  fontSize="32"
                  fontWeight="900"
                  fill="black"
                  letterSpacing="4"
                >
                  GOETVALVE
                </text>
              </svg>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setIsSignUp(false); setStep(1); }}
                className={`px-4 py-2 rounded ${!isSignUp ? "bg-black text-white" : "bg-gray-200"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsSignUp(true); setStep(1); }}
                className={`px-4 py-2 rounded ${isSignUp ? "bg-black text-white" : "bg-gray-200"}`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-lg font-semibold">{isSignUp ? "Sign Up" : "Sign In"}</h2>

            {step !== 2 && (
              <>
                <input
                  placeholder="YourCompanyEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border px-3 py-2 rounded w-64"
                />
                <input
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border px-3 py-2 rounded w-64"
                />
                {isSignUp && (
                  <>
                    <input
                      placeholder="your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border px-3 py-2 rounded w-64"
                    />
                    <input
                      placeholder="your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="border px-3 py-2 rounded w-64"
                    />
                    <input
                      placeholder="your company website"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="border px-3 py-2 rounded w-64"
                    />
                    <input
                      placeholder="your company address"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="border px-3 py-2 rounded w-64"
                    />
                    <input
                      placeholder="your position in company"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="border px-3 py-2 rounded w-64"
                    />
                  </>
                )}
              </>
            )}

            {isSignUp && step === 2 && (
              <input
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border px-3 py-2 rounded w-64"
              />
            )}

            <button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {isSignUp ? (step === 1 ? "Send Code" : "Verify & Sign Up") : "Sign In"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="welcomePage"
            className="flex flex-col gap-6 items-center justify-center text-center w-full h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold uppercase"
            >
              WELCOME TO
            </motion.h1>

            {showGoet && (
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-7xl md:text-9xl font-extrabold uppercase"
              >
                GOETVALVE
              </motion.h2>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
