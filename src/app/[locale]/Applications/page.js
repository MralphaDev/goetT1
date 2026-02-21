'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import ApplicationMobile from '../../responsive/Application/Applicationmobile'
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import Animation from './animation'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

function page() {
  const t = useTranslations('Applications') // i18n 分类
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('Select Mode') // 
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [current, setCurrent] = useState(0)
    const images = [
    { src: 'https://www.goetvalves.eu/image/c1.jpg', text: 'C1' },
    { src: 'https://www.goetvalves.eu/image/c2.jpg', text: 'C2' },
    { src: 'https://www.goetvalves.eu/image/c3.jpg', text: 'C3' },
    { src: 'https://www.goetvalves.eu/image/c4.jpg', text: 'C4' },
    { src: 'https://www.goetvalves.eu/image/c5.jpg', text: 'C5' },
    { src: 'https://www.goetvalves.eu/image/c6.jpg', text: 'C6' },
  ]
  const length = images.length

  const prev = () => setCurrent(current === 0 ? length - 1 : current - 1)
  const next = () => setCurrent(current === length - 1 ? 0 : current + 1)


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <ApplicationMobile />

  return (
    <div >
      <div className="bg-white h-screen w-screen" >

        <div
          className="relative flex bg-cover bg-center w-screen max-h-[945px]" 
          style={{
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
          <div className="relative flex flex-2 items-start">
            <img
              src="https://goetvalves.eu/image/7100dc-29.png"
              className="object-contain h-[70%] mt-50 mx-auto ml-60 z-5"
            />
              <img
              src="https://goetvalves.eu/image/7100dc-29.png"
              className="object-contain h-[60%] mt-60 mx-auto -ml-130 z-2 opacity-30 z-1"
            />
          </div>

            {/* top text and mode selector */}
          <div className="relative flex items-start min-h-[300px]">
            <div className="mr-50 mt-40">
              <h1 className="text-8xl font-semibold text-white ">{t('PageTitle')}</h1>
            </div>

            <div
              className="absolute right-5- top-1/3 -translate-y-1/2 flex flex-col items-end gap-6 "
              style={{ fontFamily: "'Russo One', sans-serif", whiteSpace: "nowrap" }}
            >
              <div className="w-80 relative ">
                <select
                  value={activeTab}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val !== "") {
                      setActiveTab(val)
                      setDropdownOpen(false)
                      setTimeout(() => setDropdownOpen(true), 0)
                    }
                  }}
                  className="
                    bg-lightBlue text-white 
                    px-10 py-3 
                    rounded-full 
                    text-2xl font-medium
                    shadow-lg
                    focus:outline-none
                    cursor-pointer
                    appearance-none 
                    w-full
                  "
                >
                  <option value="">Select Mode</option>
                  <option value="desc">Application Description</option>
                  <option value="animation">Animated Showcase</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-10 h-15 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={dropdownOpen ? { height: '100vh', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed top-0 left-0 w-screen bg-white z-5000 overflow-hidden shadow-2xl"
          onAnimationComplete={() => {
            if (!dropdownOpen) setActiveTab('') // reset after exit finishes
          }}
        >
        <div className="flex items-center justify-between p-4 bg-[white] ">
          {/* 左上角图片 */}
          <img
            src="https://goetvalves.eu/image/tm2.png"
            alt="logo"
            className="h-16 w-auto"
          />
    

          {/* 中间 Tab 按钮 */}
          <div className="flex space-x-4">
            {['desc', 'animation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  activeTab === tab
                  ? 'bg-[#0F4C71] text-white shadow-md' // 当前激活
                  : 'bg-[#28A8DE] text-white hover:bg-[#3DB0E0]' // 默认浅蓝 + hover 更亮
                }`}
              >
                {tab === 'desc' ? 'Description' : 'Showcase'}
              </button>
            ))}
          </div>

            {/* 右上角关闭按钮 */}
            <button
              onClick={() => setDropdownOpen(false)}
              className="text-white text-lg font-bold px-4 py-2 bg-[#0F4C71] rounded-full hover:bg-[#0b3a55] transition-colors"
            >
              Close Tab
            </button>
        </div>


        {/* 内容区 */}
        <div className="">
          {activeTab === 'desc' && 
          <div>
            {/* 你的 Description div */}
            <div className="relative h-screen w-screen" style={{
              backgroundImage: "url('https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671')",
              opacity: 0.9,
            }}>
                {/* Content Section */}       
                {/*<div className=" pb-10 container mx-auto mb-10 border-b-2 border-blue-400 ">
                  <h1 className="flex pt-5 text-blue-500 text-5xl " style={{ color: "#0F4C71" }}>{t('CheckOut')}</h1>
                  <h1 className="flex text-blue-500 text-5xl" style={{ color: "#28A8DE" }}>{t('OurApplications')}</h1>
                </div>*/}
                {/* Big title above carousel */}
              <h1 className="absolute left-1/2 top-1/10 transform -translate-x-1/2 text-white text-6xl sm:text-7xl md:text-6xl font-bold uppercase z-10">
                Application
              </h1>
            <div className="relative w-full h-screen flex items-center justify-center select-none">
              {/* Carousel container */}
              <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl h-[600px]">
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full transition-transform duration-500"
                    style={{ transform: `translateX(${(index - current) * 100}%)` }}
                  >
                    <img
                      src={img.src}
                      alt={img.text}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Overlay text */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                      <div className="bg-[#0F4C71] text-white px-4 py-2 rounded-md text-2xl font-semibold">
                        {t(`Images.${img.text}`)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Left / Right arrows */}
              <button
                onClick={prev}
                className="absolute top-1/2 left-[20%] transform -translate-y-1/2 text-white text-5xl z-10"
              >
                <HiArrowLeft />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-[20%] transform -translate-y-1/2 text-white text-5xl z-10"
              >
                <HiArrowRight />
              </button>
            </div>


            </div>
            
          </div>}
          {activeTab === 'animation' && <div><Animation /></div>}
        </div>
      </motion.div>




      </div>
    </div>
  )
}

export default page
