/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "th.bing.com",
      "cdn1.iconfinder.com",
      "lh3.googleusercontent.com",
      "www.bing.com",
      "www.logolynx.com",
      "i.pravatar.cc",
      "firebasestorage.googleapis.com",
      "theplace2b.com.au",
    ],
  },
};

module.exports = nextConfig;
