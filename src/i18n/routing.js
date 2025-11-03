// src/i18n/routing.js
import { defineRouting } from 'next-intl/routing';
//import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'de', 'it'],
  defaultLocale: 'en',
});


