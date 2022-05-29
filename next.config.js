/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/api/v1/(.*)', destination: '/api/v1' }]
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
