import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "be-apple.s3.ap-northeast-2.amazonaws.com",
      "store.storeimages.cdn-apple.com",
      "test.sample.com"
    ],
  },
};

export default nextConfig;
