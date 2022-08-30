const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return []
  },
  images: {
    domains: ['profile.line-scdn.net'],
  },
  i18n,
  experimental: {
    outputStandalone: true,
  },
  swcMinify: true,
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
}

module.exports = nextConfig
