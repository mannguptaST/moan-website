import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all image quality values used in components (85, 90, 95)
    qualities: [75, 85, 90, 95, 100],
    remotePatterns: [],
  },
};

export default nextConfig;
