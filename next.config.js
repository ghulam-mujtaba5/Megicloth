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
        hostname: 'picsum.photos',
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
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'www.alkaramstudio.com',
      },
      {
        protocol: 'https',
        hostname: 'pk.khaadi.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sanasafinaz.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' picsum.photos pk.sapphireonline.pk www.gulahmedshop.com placehold.co www.alkaramstudio.com pk.khaadi.com www.sanasafinaz.com; script-src 'none'; sandbox;"
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