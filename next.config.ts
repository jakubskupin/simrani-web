import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: encodeURI("/šol"), destination: "/sol", permanent: false },
      { source: encodeURI("/ŠOL"), destination: "/sol", permanent: false },
    ];
  },
};

export default nextConfig;
