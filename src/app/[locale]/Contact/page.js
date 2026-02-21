"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const t = useTranslations("ContactUs");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      console.error("Email sending failed");
    }
  } catch (err) {
    console.error(err);
  }
};


  return (
<div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-12"
  >
    {/* Left Column: Contact Title and Info */}
    <div className="flex-1 flex flex-col justify-start">
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6"
      >
        {t("ContactUsTitle")}
      </motion.h1>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex flex-col justify-start h-full space-y-2 sm:space-y-3 md:space-y-4 text-gray-700 text-sm sm:text-base md:text-base"
      >
        {/* Addresses */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 md:gap-6">
          <span className="font-thin sm:flex-1">
            <span className="font-bold">Asian inventory address:</span>{" "}
            058727 150 South Bridge Road #02, Singapore
            <br className="md:hidden" />
            <br/>(Mo – Fr 10:00 – 17:00)
            <div className="md:hidden flex items-center gap-2 sm:flex-1">
            <EnvelopeIcon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-sm sm:text-base">sgp@goetvalves.eu</span>
          </div>
          </span>
          <span className="font-thin sm:flex-1 mt-2 sm:mt-0">
            <span className="font-bold">European inventory address:</span>{" "}
            Karl-Lange-Str. 49,44791 Bochum, Germany
            <br className="md:hidden" />
            <br/>(Mo – Fr 9:00 – 15:00)
          </span>
        </div>

        {/* Emails */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2 sm:flex-1">
            <EnvelopeIcon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-sm sm:text-base">
              sgp@goetvalves.eu
            </span>
          </div>
          <div className="flex items-center gap-2 sm:flex-1 sm:mt-0">
            <EnvelopeIcon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-sm sm:text-base">info@goetvalves.eu</span>
          </div>
        </div>

        {/* Note */}
        <p className="mt-2 md:mt-4 text-gray-600 text-sm sm:text-base">
          {t("HelpText")}
        </p>
      </motion.div>

    </div>

    {/* Right Column: Contact Form */}
    <motion.form
      onSubmit={handleSubmit}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-3 sm:gap-4 md:gap-4"
    >
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder={t("YourName")}
        required
        className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder={t("YourEmail")}
        required
        className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder={t("YourMessage")}
        required
        className="border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 sm:h-32"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition"
      >
        {t("SendMessage")}
      </button>

      {submitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-green-600 font-medium mt-1 sm:mt-2 text-sm sm:text-base text-center"
        >
          {t("SubmissionSuccess")}
        </motion.p>
      )}
    </motion.form>
  </motion.div>
</div>

  );
}
