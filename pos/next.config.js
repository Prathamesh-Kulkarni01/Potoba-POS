/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'w7.pngwing.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: ''
      }
    ]
   
  
  },
  experimental: {
    turboMode: false,
  },
  "typescript": { "ignoreBuildErrors": true },
  transpilePackages: ['geist'],
};

module.exports = nextConfig;
