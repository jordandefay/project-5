/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig