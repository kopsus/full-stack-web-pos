import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "asset.kompas.com",
      },
    ],
  },
};

export default nextConfig;
