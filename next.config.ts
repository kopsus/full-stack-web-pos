import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "asset.kompas.com",
      },
      {
        hostname: "img-global.cpcdn.com",
      },
    ],
  },
};

export default nextConfig;
