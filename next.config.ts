import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "scontent-gig4-1.cdninstagram.com", pathname: "/**" },
      { protocol: "https", hostname: "scontent-gig4-2.cdninstagram.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
