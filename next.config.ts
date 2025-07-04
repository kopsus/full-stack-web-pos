import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "loempia-bom.putra-tunggal.my.id",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },
};

export default nextConfig;
