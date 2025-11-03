"use client";

import { useState } from 'react';
import React from 'react';
import { PhoneIcon, XIcon } from '@heroicons/react/solid'; // Import PhoneIcon and XIcon from Heroicons

function contactUs() {
  const [showOptions, setShowOptions] = useState(false); // State to toggle language options

  const handleClose = () => {
    setShowOptions(false); // Hide options when close icon is clicked
  };

  return (
<div className=" relative">
  {/* fixed position language switcher */}
  <div
    className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-customBlue rounded-lg shadow-lg transition-all duration-300 ease-in-out p-1"
    style={{ zIndex: 200 }}
    onMouseEnter={() => setShowOptions(true)}
    onMouseLeave={() => setShowOptions(false)}
  >
    <div className="flex items-center justify-center w-10 h-10">
      <PhoneIcon className="h-6 w-6 text-white" />
    </div>

    <div
      className={`absolute right-0 top-0 transform transition-transform duration-300 ease-in-out ${showOptions ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ width: '300px', zIndex: 2000 }}
    >
      <div className="bg-white rounded-l-lg p-4 shadow-lg relative">
        <button 
          onClick={handleClose} 
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5 text-gray-600" />
        </button>

        <span className="block mb-2 text-lg font-semibold text-customBlue">Contact Us:</span>
        <p>Sie benötigen Hilfe?</p><br/>
        <p>Für alle Fragen stehen wir Ihnen telefonisch zur Verfügung:</p>
        <p className="mt-2 font-medium">Mo – Fr 08:30 – 17:00 Uhr</p>
        <p className="mt-1 font-semibold">+49 174 4965240</p>
        <p className="mt-2">oder schreiben Sie uns eine E-mail:</p>
        <p className="text-customBlue font-semibold">hanmavon@gmail.com</p>
      </div>
    </div>
  </div>
</div>

  );
}

export default contactUs;
