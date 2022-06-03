/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return []
  },
  images: {
    domains: ['profile.line-scdn.net'],
  },
  i18n: {
    locales: ['en-US', 'th'],
    defaultLocale: 'en-US',
  },
  experimental: {
    outputStandalone: true,
  },
}

module.exports = nextConfig
