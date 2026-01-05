import React from 'react'
import { useTranslations } from 'next-intl'

function faq() {
const t = useTranslations('service') // i18n 分类，小写和 json key 对应
  return (
    <div>
        
<div className="h-screen w-screen flex flex-col items-center justify-center "
     style={{
        backgroundImage: "url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        opacity: 0.95,
     }}>
  
  {/* Big White Title */}
  <h1 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center drop-shadow-lg">
    {t('MainTitle') || "Welcome to Our Support Center"}
  </h1>

  {/* Cards */}
  <div className="grid grid-cols-3 gap-6 w-4/5 animate-fadeIn">
    {/* Left Box */}
    <div className="col-span-1 p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#1B5A7A] to-[#0F4C71] text-white h-[500px] flex flex-col justify-between transition-transform transform hover:scale-105">
      <div>
        <h2 className="text-2xl font-semibold mb-3">{t('FAQs')}</h2>
        <p className="text-sm mb-4">{t('FAQsDesc')} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
        <h2 className="text-2xl font-semibold mb-3">{t('ServiceMaintenance')}</h2>
        <p className="text-sm">{t('ServiceMaintenanceDesc')} Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt.</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">{t('Tips')}</h2>
        <ul className="text-sm list-disc ml-5 space-y-1">
          <li>Check system updates regularly</li>
          <li>Contact support for urgent issues</li>
          <li>Keep your profile info updated</li>
        </ul>
      </div>
    </div>

    {/* Right Box */}
    <div className="col-span-2 p-8 rounded-xl shadow-lg bg-gradient-to-br from-[#0F4C71] to-[#0A2E4D] text-white h-[500px] flex flex-col justify-between transition-transform transform hover:scale-105">
      <div>
        <h2 className="text-2xl font-semibold mb-3">{t('Commissioning')}</h2>
        <p className="text-sm mb-4">{t('CommissioningDesc')} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt vestibulum ligula, et laoreet arcu ultricies non.</p>
        <h2 className="text-2xl font-semibold mb-3">{t('GenericTextTitle')}</h2>
        <p className="text-sm mb-4">{t('GenericTextDesc')} Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
        <h2 className="text-2xl font-semibold mb-2">More Info</h2>
        <ul className="text-sm list-disc ml-5 space-y-1">
          <li>FAQs on usage and setup</li>
          <li>Service schedule updates</li>
          <li>Guides and tutorials</li>
          <li>Community discussions</li>
          <li>Contact support anytime</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Animation CSS */}
  <style jsx>{`
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 1s ease-out forwards;
    }
  `}</style>
</div>


    </div>
  )
}

export default faq