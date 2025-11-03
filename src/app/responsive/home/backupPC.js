'use client'
import React from 'react'
import { useEffect ,useState} from 'react';
import {useTranslations} from 'next-intl';
//import {Link} from '@/i18n/routing';
import Langswitcher from '../../[locale]/langSwitcher'
import ContactPage from '../../[locale]/Contact/page';
import Link from 'next/link'
// Import Swiper React components
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Swipermodule from '../../[locale]/Swipermodule';

function HomePagePC() {
  return (
            <div>
            
            <div className="flex bg-cover bg-center w-screen" style={{ height: "980px" }}>
              <div className="flex flex-1 items-center">
                <video autoPlay loop muted className="object-cover w-full h-full">
                  <source src='/p3.mp4' type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="bg-white h-screen w-screen pt-10 mb-16">
              <div className="flex pr-10 pl-10 h-full">
                <div className="rounded-tl-3xl rounded-bl-3xl w-1/3 h-full relative overflow-hidden transition-all duration-500 hover:w-3/4 flex">
                  <video autoPlay loop muted className="object-cover w-full h-full">
                    <source src="https://www.nieruf.de/media/8c/89/17/1683814602/NieRuf_Animation_Website_Produkt-Konfigurator_Akkordeon_DE_kom.mp4" type="video/mp4" />
                  </video>
                </div>

                <div className="w-1/3 h-full relative overflow-hidden transition-all duration-500 hover:w-3/4">
                  <img src="https://www.nieruf.de/thumbnail/3f/97/45/1683190351/NieRuf_Bilder_Web-Startseite_Akkordeon_Bild-02_komprimiert_1920x1920.webp" alt="Image 2" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 opacity-0 bg-opacity-50 transition-opacity duration-500 flex justify-center items-center hover:opacity-100">
                    <p className="text-red text-center">Text for Image 2</p>
                  </div>
                </div>

                <div className="rounded-tr-3xl rounded-br-3xl w-1/3 h-full relative overflow-hidden transition-all duration-500 hover:w-3/4">
                  <img src="https://www.nieruf.de/thumbnail/0b/09/cf/1683190358/NieRuf_Bilder_Web-Startseite_Akkordeon_Bild-03_komprimiert_1920x1920.webp" alt="Image 3" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-opacity-50 opacity-0 transition-opacity duration-500 flex justify-center items-center hover:opacity-100">
                    <p className="text-red text-center">Text for Image 3ada ss d</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-screen h-[90vh] bg-white flex my-[5%]">
              <div className="w-2/3 p-8 space-y-4 flex flex-col justify-center pl-[5%] pr-[5%]">
                <h2 className="text-5xl font-bold">
                  TECHNOLOGIE BRAUCHT <br /> <span className="text-lightBlue">KONTROLLE</span>
                </h2>
                <p className="text-xl pb-[50px]">
                  GoetValve, specializing in cryogenic valve
                </p>

                <p className="text-base text-gray-700 text-justify w-4/5">
                  Goetvalve, which has been established for more than 20 years, is a professional company specializing in ultra-low temperature fluid control...
                </p>

                <p className="text-base text-gray-700 text-justify w-4/5">
                  In order to fulfill the environmental protection initiative, GOETVALVE has specially omitted the casting process with high energy consumption...
                </p>

                <p className="text-base text-gray-700 text-justify w-4/5">
                  Our philosophy is: design and manufacture high-quality, highly reliable, and cost-effective products, and provide customers with practical solutions.
                </p>
              </div>

              <div className="w-3/5 relative flex items-center justify-center pr-[2%]">
                <img
                  src="https://www.cemegroup.com/Content/images/assets/ceme_tecnologia.jpg"
                  alt="Ceme Technology"
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Entdecken Sie mehr button */}
                <div className="flex justify-center items-center absolute bottom-[50%] right-[30vw] w-[369px] h-[85px] group" style={{ backgroundColor: '#4FA1CA', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)' }}>
                  <Link href="/de/Company" className="relative text-white text-[27px] z-10">
                    Entdecken Sie mehr
                  </Link>
                  <div className="absolute top-0 left-0 w-0 h-full bg-gray-500 opacity-50 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>

            <div className="flex mb-[200px] h-[60vh]">
              <div className="flex flex-col justify-center p-8 bg-gray-800 text-white w-1/3">
                <h2 className="text-6xl font-bold mb-1">PRODUCT</h2>
                <h2 className="text-6xl font-bold mb-1">
                  <span className="text-blue-500">APPLICATION</span>
                </h2>
                <h2 className="text-6xl font-bold">SUPPORT</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 w-2/3 bg-white pl-[20px] pr-[50px]">
                <Link href="/de/Product-login/Product1" className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
                  <img src="http://www.goetvalve.eu/images/cc1.jpg" alt="Philips" className="h-full grayscale object-cover rounded-lg" />
                  <span className="text-customBlue text-2xl mt-[20px] font-bold">Products</span>
                </Link>
                <Link href="/de/Applications" className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
                  <img src="http://www.goetvalve.eu/images/cc2.jpg" alt="Coca-Cola" className="h-full grayscale object-cover rounded-lg" />
                  <span className="text-customBlue text-2xl mt-[20px] font-bold">Applications</span>
                </Link>
                <Link href="/de/Service" className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
                  <img src="http://www.goetvalve.eu/images/cc3.jpg" alt="Lavazza" className="h-full grayscale object-cover rounded-lg" />
                  <span className="text-customBlue text-2xl mt-[20px] font-bold">Service & Support</span>
                </Link>
              </div>
            </div>

            <div className="px-[10vw] mb-[10vh] border-b border-blue-400 border-b-[5px]" style={{ height: "300px" }}>
              <div className="flex flex-col items-center justify-center h-[50px] mb-[50px]">
                <div className="flex flex-col items-center p-4 rounded-lg mb-[50px]">
                  <h1 className="text-customBlue text-5xl font-bold mb-2">Product Center</h1>
                  <p className="text-lightBlue text-xl">Solenoid valve for Cryogenic service</p>
                </div>
              </div>

              <Swipermodule />
            </div>
            <ContactPage/>

            <div className="footer bg-darkGray">
              <div className="footer-content">
                <p className="text-white text-center py-4">NieRuf Solenoid Valves</p>
              </div>
            </div>
          </div>
  )
}

export default HomePagePC