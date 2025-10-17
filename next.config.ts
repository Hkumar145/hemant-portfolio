import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cdnjs.cloudflare.com' },
      // Uncomment if you switch to Wikipedia or other sources later:
      // { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
    domains: ['cdn.jsdelivr.net'],
    
  },
};

export default nextConfig;
