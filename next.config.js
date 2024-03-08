/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com', pathname: '**' },
      // Add more patterns here as needed
    ],
  },
};

module.exports = nextConfig;
