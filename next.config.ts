import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yoga.holodfood.kiev.ua',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
