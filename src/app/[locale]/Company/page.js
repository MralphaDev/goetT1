"use client";
import React from "react";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("Company");

  return (
    <div className="bg-white w-full min-h-screen px-4 lg:px-0">

      <div className="flex flex-col lg:flex-row my-[5%]">

        {/* Left Text */}
        <div className="lg:w-2/3 w-full p-4 lg:pl-[10%] lg:pr-[5%] flex flex-col justify-center space-y-4 text-justify">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            {t("aboutUs")} <br />
            <span className="text-lightBlue">{t("companyName")}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            {t("description")}
          </p>
        </div>


        {/* Right Image */}
        <div className="lg:w-3/5 w-full relative flex items-center justify-center lg:pr-[5%] h-64 sm:h-80 md:h-96 lg:h-[80vh] mt-4 lg:mt-0">
          <img
            src="http://www.goetvalve.eu/images/ab2.jpg"
            alt="Company Image"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Overlay Button - PC only */}
          <div className="hidden lg:flex absolute top-1/2 transform -translate-y-1/2 -left-12
                          bg-[#4FA1CA] shadow-lg text-white rounded flex justify-center items-center
                          w-60 h-1/10 text-xl">
            GOETVALVE GMBH
          </div>
        </div>

      </div>
    </div>
  );
}

export default Page;
