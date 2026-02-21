import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaCcAmex,FaPaypal  } from "react-icons/fa";
import { SiBitcoin, SiTether } from "react-icons/si";
import { SiUsdcoin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-screen bg-[url('https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671')] from-blue-600 to-blue-500 text-white py-12 opacity-85 bg-cover bg-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm font-thin mb-4"><span className="font-bold">Asian inventory address</span><br/> 058727 150 South Bridge Road #02 Fookhai, Singapore</p>
          <p className="text-sm font-thin mb-2">(Mo – Fr 10:00 – 17:00)</p>
           <p className="text-sm font-thin mb-4">Email1: sgp@goetvalves.eu</p>
          <p className="text-sm font-thin mb-4"><span className="font-bold">European inventory address</span><br/> Karl-Lange-Str. 49,44791 Bochum, Germany</p>
          <p className="text-sm font-thin mb-2">(Mo – Fr 9:00 – 15:00)</p>
          <p className="text-sm font-thin mb-4">Email2: info@goetvalves.eu</p>
         
          <div className="flex gap-3 mt-4 text-white">
            <a href="#" className="hover:text-gray-200 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Payment Methods */}
      <div>
        <h3 className="text-xl font-bold mb-4">Payment Methods</h3>

        {/* First row: cards + PayPal */}
        <div className="flex gap-3 text-2xl text-white mb-2">
          <FaCcVisa className="hover:text-gray-200 transition" />
          <FaCcMastercard className="hover:text-gray-200 transition" />
          <FaCcAmex className="hover:text-gray-200 transition" />
          <div className="text-[17px] font-bold" fontFamily="Arial, sans-serif" fill="white">SEPA</div>


        </div>

          <div className="flex gap-3 text-2xl text-white mb-2">
          <FaPaypal className="hover:text-gray-200 transition" />
           <img
            src="https://goetvalves.eu/image/Alipay.svg"
            alt="Alipay"
            className="h-6 w-15 hover:opacity-80 transition "
          />
        </div>

        {/* third row: crypto */}
        <div className="flex gap-3 text-2xl text-white">
          <SiBitcoin className="hover:text-gray-200 transition" />
          <SiTether className="hover:text-gray-200 transition" />
          <img
            src="https://goetvalves.eu/image/usdc.png"
            alt="USDC"
            className="h-6 w-6 hover:opacity-80 transition"
          />
        </div>
      </div>

      {/* delivery company */}
      <div>
        <h3 className="text-xl font-bold mb-4">Delivery Companies</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-gray-200 transition flex items-center gap-2">
              📦 DHL
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200 transition flex items-center gap-2">
              🚀 SF Express
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200 transition flex items-center gap-2">
              ✈️ FedEx
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200 transition flex items-center gap-2">
              🚚 UPS
            </a>
          </li>
        </ul>
      </div>


        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-200 transition">Bestellung & Versand</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Zahlungsbedingungen</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Katalog</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-100 text-sm">
        &copy; {new Date().getFullYear()} GOETVALVE. All rights reserved.
      </div>
    </footer>
  );
}
