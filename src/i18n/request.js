// src/i18n/request.js
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Automatically get the locale from the request URL
  const requested = await requestLocale; // this is the `[locale]` segment

  //为什么要requestLocale而不是param
  //1️⃣ params 在 App Router 中不是异步的
  //2️⃣ requestLocale 是异步 API
  // next-intl 提供了 requestLocale，它会 等待 Next.js 确认当前请求的 locale，包括：
  // URL segment [locale]
  // cookie 中的 locale
  // 浏览器默认语言
  // 也就是说，你拿到的 requestLocale 是经过验证、异步准备好的 locale，不会出现 undefined 或错误。
  //params.locale：直接从 URL segment 拿，可能还没准备好 → 容易 undefined 或报错
  // requestLocale：官方推荐，异步获取并验证 → 安全、可靠

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return {
    locale,
    messages
  };
});
