import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.seeklogo.com",
        port: "",
        // match any path under /logo-png/
        pathname: "/logo-png/**",
      },
    ],
  },
  /* config options here */
  eslint: {
    // This will skip ESLint during `next build` (and thus on Vercel)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: skips all type errors during `next build`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
