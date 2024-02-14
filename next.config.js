/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Define loader for specific domains
    loader: 'default',
    // Set domains for image optimization
    domains: ['lh3.googleusercontent.com', ''],
  },
};

module.exports = nextConfig;
