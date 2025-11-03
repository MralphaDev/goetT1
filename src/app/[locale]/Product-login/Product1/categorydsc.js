import React from 'react';
import { useTranslations } from 'next-intl';

function CategoryDsc() {
  const t = useTranslations('Product1'); // Load "Category" namespace

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
            "url('https://www.nieruf.de/thumbnail/14/3f/d1/1708518038/436_Category_800x800.png?ts=1711399957')",
        }}
      >
        <div
          className="absolute inset-x-0 top-0.4 h-full opacity-70"
          style={{ backgroundColor: 'var(--color-customBlue)' }}
        />

        <div className="flex justify-center items-center h-full pr-[10%]">
          <div className="flex justify-center relative w-1/2 z-11 text-white">
            <h1 className="text-4xl font-bold">{t('title')}</h1>
          </div>

          <div className="flex justify-center relative w-1/2 z-11 text-white">
            <p className="mt-2 text-justify w-[80%]">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDsc;
