'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Swipermodule from '../../[locale]/Swipermodule';
import ContactPage from '../../[locale]/Contact/page';

export default function TabletHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white fixed w-full top-0 left-0 z-50 shadow-md">
        <h1 className="text-xl font-bold">GOETVALVE</h1>
        <button
          className="text-3xl font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-500 ease-in-out z-40 flex flex-col pt-24 px-6 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-6 right-6 text-3xl font-bold"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        <Link href="/de/Product-login/Product1" className="text-xl font-semibold my-4" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link href="/de/Applications" className="text-xl font-semibold my-4" onClick={() => setMenuOpen(false)}>Applications</Link>
        <Link href="/de/Service" className="text-xl font-semibold my-4" onClick={() => setMenuOpen(false)}>Service & Support</Link>
        <Link href="/de/Company" className="text-xl font-semibold my-4" onClick={() => setMenuOpen(false)}>Company</Link>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-30" onClick={() => setMenuOpen(false)} />}

      {/* Hero video */}
      <div className="flex bg-cover bg-center w-full mt-16" style={{ height: "500px" }}>
        <video autoPlay loop muted className="object-cover w-full h-full">
          <source src='/p3.mp4' type="video/mp4" />
        </video>
      </div>

      {/* Accordion / image section */}
      <div className="bg-white pt-8 mb-12 px-4 md:px-16">
        <div className="flex flex-col md:flex-row gap-4 h-[300px] md:h-[400px]">
          <div className="rounded-tl-3xl rounded-bl-3xl flex-1 relative overflow-hidden transition-all duration-500 hover:flex-[3]">
            <video autoPlay loop muted className="object-cover w-full h-full">
              <source src="https://www.nieruf.de/media/8c/89/17/1683814602/NieRuf_Animation_Website_Produkt-Konfigurator_Akkordeon_DE_kom.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-1 relative overflow-hidden transition-all duration-500 hover:flex-[3]">
            <img src="https://www.nieruf.de/thumbnail/3f/97/45/1683190351/NieRuf_Bilder_Web-Startseite_Akkordeon_Bild-02_komprimiert_1920x1920.webp" alt="Image 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 opacity-0 bg-opacity-50 transition-opacity duration-500 flex justify-center items-center hover:opacity-100">
              <p className="text-red text-center">Text for Image 2</p>
            </div>
          </div>
          <div className="rounded-tr-3xl rounded-br-3xl flex-1 relative overflow-hidden transition-all duration-500 hover:flex-[3]">
            <img src="https://www.nieruf.de/thumbnail/0b/09/cf/1683190358/NieRuf_Bilder_Web-Startseite_Akkordeon_Bild-03_komprimiert_1920x1920.webp" alt="Image 3" className="w-full h-full object-cover" />
            <div className="absolute inset-0 opacity-0 bg-opacity-50 transition-opacity duration-500 flex justify-center items-center hover:opacity-100">
              <p className="text-red text-center">Text for Image 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col md:flex-row my-8 px-4 md:px-16 gap-8">
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            TECHNOLOGIE BRAUCHT <br /> <span className="text-lightBlue">KONTROLLE</span>
          </h2>
          <p className="text-lg md:text-xl">GoetValve, specializing in cryogenic valve</p>
          <p className="text-base text-gray-700">Goetvalve, established 20+ years, professional in ultra-low temperature fluid control...</p>
          <p className="text-base text-gray-700">In order to fulfill environmental protection, GOETVALVE has omitted high-energy casting...</p>
          <p className="text-base text-gray-700">Our philosophy: design and manufacture high-quality, reliable, cost-effective products, offering practical solutions.</p>
        </div>
        <div className="flex-1 relative flex items-center justify-center">
          <img src="https://www.cemegroup.com/Content/images/assets/ceme_tecnologia.jpg" alt="Ceme Technology" className="w-full h-full object-cover rounded-lg" />
          <div className="flex justify-center items-center absolute bottom-1/2 right-1/4 w-[250px] h-[60px] group bg-[#4FA1CA] shadow-lg">
            <Link href="/de/Company" className="relative text-white text-lg md:text-2xl z-10">Entdecken Sie mehr</Link>
            <div className="absolute top-0 left-0 w-0 h-full bg-gray-500 opacity-50 group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>

        {/* Product / Application / Support section */}
        {/* Centered Grid Links */}
<div className="flex justify-center mb-16 px-4 md:px-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
    <Link href="/de/Product-login/Product1" className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
      <img src="http://www.goetvalve.eu/images/cc1.jpg" alt="Products" className="h-48 md:h-52 w-full object-cover rounded-lg grayscale" />
      <span className="text-customBlue text-lg md:text-2xl mt-4 font-bold">Products</span>
    </Link>

    <Link href="/de/Applications" className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
      <img src="http://www.goetvalve.eu/images/cc2.jpg" alt="Applications" className="h-48 md:h-52 w-full object-cover rounded-lg grayscale" />
      <span className="text-customBlue text-lg md:text-2xl mt-4 font-bold">Applications</span>
    </Link>

    <Link href="/de/Service" className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
      <img src="http://www.goetvalve.eu/images/cc3.jpg" alt="Service" className="h-48 md:h-52 w-full object-cover rounded-lg grayscale" />
      <span className="text-customBlue text-lg md:text-2xl mt-4 font-bold">Service & Support</span>
    </Link>
  </div>
</div>


      {/* Product center swiper */}
      <div className="px-4 md:px-16 mb-16 border-b-4 border-blue-400">
        <div className="flex flex-col items-center py-8">
          <h1 className="text-3xl md:text-5xl text-customBlue font-bold mb-2">Product Center</h1>
          <p className="text-lg md:text-xl text-lightBlue">Solenoid valve for Cryogenic service</p>
        </div>
        <Swipermodule />
      </div>

      <ContactPage />
    </div>
  );
}
