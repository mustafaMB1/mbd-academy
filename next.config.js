const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = { 
    output: 'standalone', // ✅ هذا هو المطلوب لنتلايفاي
  images: {
    unoptimized: true,
        remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ], // لتجنب مشاكل الصور أثناء النشر
  },
};
 

module.exports = withNextIntl(nextConfig);