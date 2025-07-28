/** @type {import('next').NextConfig} */
const nextConfig = {

  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'megicloth.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gulahmedshop.com',
        pathname: '/media/logo/stores/1/**',
      },
      {
        protocol: 'https',
        hostname: 'pk.sapphireonline.pk',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Handle font loading issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ];
  },
  // Optimize font loading
  optimizeFonts: true,
  // Increase timeout for font loading
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;