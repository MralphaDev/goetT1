'use client'
import React from 'react'
import { useState, useEffect} from 'react';
// Import Swiper React components
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link'
//import CurtainLink from './Curtainloader';
import { motion, AnimatePresence } from 'framer-motion';


export default function Swipermodule() {
    let locale ='de'
    
  return (
   
    <div>


        <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={6}
        navigation
        //pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        >
        
        <SwiperSlide>
          <div className="relative">
            <div className="flex justify-center cursor-pointer">
              <Link href={`/${locale}/Product-login/Solenoid`}>
                <img
                  src="http://www.goetvalve.eu/UploadFiles/2021822144822812.png"
                  className="h-32 hover:scale-105 transition-transform duration-200"
                  alt="Solenoid valves"
                />
              </Link>
            </div>
            <div className="flex justify-center items-center text-gray-400">
              Solenoid valves
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
            <div>
            <div className='flex justify-center cursor-pointer'>
                <Link   href={`/${locale}/Product-login/Pressureactuated`}>   {/* <Link href={`/${locale}/Product-login/Product1`}> */}
                    <img className='h-32 hover:scale-105 transition-transform duration-200' 
                    src="http://www.goetvalve.eu/UploadFiles/2021822144822812.png">
                    </img>
                </Link>
            
            </div>
                <div className='flex justify-center items-center text-gray-400'>
                    Pressure actuated valves
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div>
            <div className='flex justify-center cursor-pointer'>
                <Link href={`/${locale}/Product-login/Liqnitro`}>
                <img className='h-32 hover:scale-105 transition-transform duration-200' src="http://www.goetvalve.eu/UploadFiles/2021822144822812.png"></img>
                </Link>
            </div>
                <div className='flex justify-center items-center text-gray-400'>
                Liq-nitrogen non-return valves
                </div>
            </div>
        </SwiperSlide>
        
        <SwiperSlide>
            <div>
            <div className='flex justify-center cursor-pointer'>
                <img className='h-32 hover:scale-105 transition-transform duration-200' src="http://www.goetvalve.eu/UploadFiles/2021102318486698.png"></img>
            </div>
                <div className='flex justify-center items-center text-gray-400'>
                    Liquid nitrogen Filter
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div>
            <div className='flex justify-center cursor-pointer'>
                <img className='h-32 hover:scale-105 transition-transform duration-200' src="http://www.goetvalve.eu/UploadFiles/2021820201112859.png"></img>
            </div>
                <div className='flex justify-center items-center text-gray-400'>
                cryo used Safety valves 
                </div>
            </div>
        </SwiperSlide>
        
        <SwiperSlide>
            <div>
            <div className='flex justify-center cursor-pointer'>
                <img className='h-32 hover:scale-105 transition-transform duration-200' src="http://www.goetvalve.eu/UploadFiles/2021822144822812.png"></img>
            </div>
                <div className='flex justify-center items-center text-gray-400'>
                Solenoid Valve
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div>
            <div className='flex justify-center'>
                <img className='h-32 hover:scale-105 transition-transform duration-200' src="http://www.goetvalve.eu/UploadFiles/2021822144822812.png"></img>
            </div>
                <div className='flex justify-center items-center text-gray-400'>
                Pressure actuated valves
                </div>
            </div>
        </SwiperSlide>
        
        </Swiper>   
    </div> 
  )
}

