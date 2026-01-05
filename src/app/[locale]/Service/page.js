'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import ServiceMobile from '../../responsive/Service/ServiceMobile'
import { useTranslations } from 'next-intl'
import Calculator from './calculator'
import { motion } from 'framer-motion'
import GeneralInfo from './generalInfo'
import Faq from './faq'

function page() {
  const t = useTranslations('service') // i18n 分类，小写和 json key 对应
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('Select Mode') // 'kv', 'info', 'faq'
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // State for card inputs & results
  
  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <ServiceMobile />

    const tabs = [
    { key: "kv", label: "KV Value Calculator" },
    { key: "info", label: "General Information" },
    { key: "faq", label: "FAQ & Support" },
  ]
  return (
    <div>
      {/* Main section with background image + mode selector */}
      <div className="w-screen ">
        {/*<div className="pt-12 pb-10 container mx-auto mb-10 border-b-2 border-blue-400 ">
          <h1 className="flex text-blue-500 text-5xl " style={{ color: "#0F4C71" }}>
            {t('PageTitle')}
          </h1>
          <p className="mt-4 text-gray-700 text-lg max-w-3xl">
            {t('IntroText')}
          </p>
        </div>*/}
        <div className="relative w-screen h-screen" >
            <img
              src="https://goetvalves.eu/image/dn4.png"
              alt={t('MainImageAlt')}
              className="w-full h-full object-cover"
              style={{ objectPosition: "20% 30%" }}
            />
            {/* overlay pattern */}
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

          {/* big title + selector */}
          <div
            className="absolute right-10 top-1/4 -translate-y-1/2 flex flex-col items-end gap-6"
            style={{ fontFamily: "'Russo One', sans-serif", whiteSpace: "nowrap" }}
          >
            {/* Big title */}
            <div className="text-white text-6xl md:text-8xl font-extrabold">
              {t('BigRightTitle')}
            </div>

              {/* Dropdown Wrapper */}
<div className="relative w-72">  {/* relative container for positioning */}
  <select
    value={activeTab}
    onChange={(e) => {
      const val = e.target.value
      if (val !== "") {
        setActiveTab(val)       // set the tab
        setDropdownOpen(false)  // reset first
        setTimeout(() => setDropdownOpen(true), 0) // reopen immediately
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
    <option value="" className='text-lg font-thin'>Select Mode</option>
    <option value="kv" className='text-lg font-thin'>KV Value Calculator</option>
    <option value="info" className='text-lg font-thin'>General Information</option>
    <option value="faq" className='text-lg font-thin'>FAQ & Support</option>
  </select>

  {/* Custom white arrow outside the <select> */}
  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
    <svg className="w-10 h-15 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
    </svg>
  </div>
</div>

            
          </div>
            
          <br />

          {/*<div className="grid grid-cols-3 gap-5 text-white">
            <div className="col-span-1 p-4" style={{ height: "400px", backgroundColor: "#28A8DE" }}>
              <div>
                <h2 className="text-lg">{t('FAQs')}</h2>
                <p className="mt-2 text-sm">{t('FAQsDesc')}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg">{t('ServiceMaintenance')}</h2>
                <p className="mt-2 text-sm">{t('ServiceMaintenanceDesc')}</p>
              </div>
            </div>
            <div className="col-span-2 bg-[#0F4C71] p-4">
              <div>
                <h2 className="text-lg">{t('Commissioning')}</h2>
                <p className="mt-2 text-sm">{t('CommissioningDesc')}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg">{t('GenericTextTitle')}</h2>
                <p className="mt-2 text-sm">{t('GenericTextDesc')}</p>
              </div>
            </div>
          </div>*/}

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
            {['kv', 'info', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  activeTab === tab
                  ? 'bg-[#0F4C71] text-white shadow-md' // 当前激活
                  : 'bg-[#28A8DE] text-white hover:bg-[#3DB0E0]' // 默认浅蓝 + hover 更亮
                }`}
              >
                {tab === 'kv' ? 'KV Calculator' : tab === 'info' ? 'Info' : 'FAQ'}
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
        {activeTab === 'kv' && <div>
          {/* 你的 KV calculator div */}
          <div className="h-screen w-screen"
                style={{
                opacity: 0.8,
                backgroundImage: "url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)",
            }}>
          <Calculator />

          </div>
          
          </div>}
        {activeTab === 'info' && <div>{/* 你的 General Information div */}<GeneralInfo /></div>}
        {activeTab === 'faq' && <div>{/* 你的 FAQ & Support div */}<Faq /></div>}
      </div>
      </motion.div>

    </div>
  )
}

export default page
