// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net', pathname: '/gh/simple-icons/simple-icons/icons/**' },
      { protocol: 'https', hostname: 'cdnjs.cloudflare.com', pathname: '/ajax/libs/twemoji/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
