import React from 'react';
import { useTranslations } from 'next-intl';

function CategoryDsc({ tempFilters9 }) {
  const activeCategory = String(tempFilters9 || 'Solenoid'); 

  const namespaceMap = {
    Solenoid: 'Product1',
    'Pressure-actuated': 'Pressureactuated',
    'Liqnitrogen-non-return': 'liqnitrogen-non-return',
    Liqnitrogenfilter: 'liqnitrofilter',
    SafetyValve: 'safetyValve'
  };

  const t = useTranslations(namespaceMap[activeCategory] || 'Product1');

  // Split title at "for" if present
  const rawTitle = t('title');
  const titleParts = rawTitle.includes('non')
    ? rawTitle.split(/(non.*)/)
    : [rawTitle];

  return (
    <div>
      <div
        className="relative mb-20"
        style={{
          height: '40vh',
          width: '100vw',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            "url('https://goetvalves.eu/image/ab5s.jpg')",
        }}
      >
        {/* Overlay with second background */}
        <div
          className="absolute inset-0 h-full w-full opacity-70"
          style={{ backgroundImage: "url('https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />

        <div className="flex justify-center items-center h-full pr-[10%]">
          <div className="flex justify-center relative w-1/2 z-11 text-white" style={{ fontFamily: 'Bahnschrift SemiBold SemiConden' }}>
            <h1 className="text-6xl font-bold">
              {titleParts.map((part, index) => (
                <React.Fragment key={index}>
                  {part.trim()}
                  {index === 0 && titleParts.length > 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </div>

          <div className="flex justify-center relative w-1/2 z-11 text-white" style={{ fontFamily: 'Bahnschrift SemiBold SemiConden' }}>
            <p className="mt-2 text-justify w-[80%]">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDsc;
