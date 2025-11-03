import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-screen bg-[#28A8DE] from-blue-600 to-blue-500 text-white py-12 mt-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>123 Company St.</p>
          <p>City, State, ZIP</p>
          <p>Email: info@example.com</p>
          <p>Phone: 123-456-7890</p>
          <div className="flex gap-3 mt-4 text-white">
            <a href="#" className="hover:text-gray-200 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
          <div className="flex gap-3 text-2xl text-white">
            <FaCcVisa className="hover:text-gray-200 transition" />
            <FaCcMastercard className="hover:text-gray-200 transition" />
            <FaCcAmex className="hover:text-gray-200 transition" />
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-xl font-bold mb-4">Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-200 transition">Product 1</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Product 2</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Product 3</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-200 transition">Service 1</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Service 2</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Service 3</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-100 text-sm">
        &copy; {new Date().getFullYear()} GOETVALVE. All rights reserved.
      </div>
    </footer>
  );
}
