'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import ApplicationMobile from '../../responsive/Application/Applicationmobile'
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

function page() {
  const t = useTranslations('Applications') // i18n 分类
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <ApplicationMobile />

  return (
    <div >
      <div className="bg-white h-screen w-screen mb-50" style={{ height: "2000px" }}>

        <div
          className="relative flex bg-cover bg-center w-screen"
          style={{
            height: "900px",
            backgroundImage: "url(https://goetvalves.eu/image/ban2.jpg)",
          }}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)",
            }}
          />

          {/* content */}
          <div className="relative flex flex-2 items-center">
            <img
              src="https://goetvalves.eu/image/7100dc-29.png"
              className="object-contain h-full mx-auto mt-10 ml-45 z-2"
            />
          </div>

          <div className="relative flex flex-2 items-center ">
            <img
              src="https://goetvalves.eu/image/7100.png"
              className="object-contain h-[60%] mx-auto mt-10 opacity-50 -ml-25 "
            />
          </div>

          <div className="relative flex items-start flex-4">
            <div style={{ marginTop: "25%" }}>
              <h1 className="text-8xl font-semibold text-white">{t('PageTitle')}</h1>
            </div>
          </div>
        </div>

        <div className="pt-12 pb-10 container mx-auto mb-10 border-b-2 border-blue-400 ">
          <h1 className="flex pt-5 text-blue-500 text-5xl " style={{ color: "#0F4C71" }}>{t('CheckOut')}</h1>
          <h1 className="flex text-blue-500 text-5xl" style={{ color: "#28A8DE" }}>{t('OurApplications')}</h1>
        </div>

        <div className="mt-20 container mx-auto">
          <div className="grid grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
              <img src="https://www.goetvalves.eu/image/c1.jpg" alt="Image 1" className="w-full h-full"></img>
              <div className="absolute inset-0 flex items-end pb-5 pl-3 opacity-0  hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                {t('Images.C1')}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
              <img src="https://www.goetvalves.eu/image/c2.jpg" alt="Image 2" className="w-full h-full"></img>
              <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                {t('Images.C2')}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
              <img src="https://www.goetvalves.eu/image/c3.jpg" alt="Image 3" className="w-full h-full"></img>
              <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                {t('Images.C3')}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
              <img src="https://www.goetvalves.eu/image/c4.jpg" alt="Image 4" className="w-full"></img>
              <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                {t('Images.C4')}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
              <img src="https://www.goetvalves.eu/image/c5.jpg" alt="Image 5" className="w-full h-full"></img>
              <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                {t('Images.C5')}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
              <img src="https://www.goetvalves.eu/image/c6.jpg" alt="Image 6" className="w-full h-full"></img>
              <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                {t('Images.C6')}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page
