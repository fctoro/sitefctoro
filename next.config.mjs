/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
  },
  output: 'standalone',
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'public/elite/video/**/*',
      'public/TEAMPICTURES/**/*',
      'bonmachetrading/**/*',
      'VIEDO_JOUEURS_ELITE/**/*',
      'TEAMPICTURES/**/*',
      'stafftoro/**/*',
      'LOGO DES EQUIPES/**/*',
      'out/**/*',
      '.next/cache/**/*',
    ],
  },
}

export default nextConfig
