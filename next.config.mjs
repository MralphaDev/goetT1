import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withNextIntl = createNextIntlPlugin({
  i18nRequestConfig: './app/i18n/request.js' // <-- path to your request.js
});

export default withNextIntl(nextConfig);
// next.config.mjs -> createNextIntlPlugin -> i18nRequestConfig (request.js) -> messages/JSON -> NextIntlClientProvider -> pages use useTranslations()
