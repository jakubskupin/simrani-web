import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: encodeURI("/šol"), destination: "/sol", permanent: false },
      { source: encodeURI("/ŠOL"), destination: "/sol", permanent: false },
      // hosté: jméno a příjmení se spojovníkem (23. 11. 2026), staré adresy trvale přesměrovat
      ...[
        ["dennyworm", "denny-worm"], ["hanavackova", "hana-vackova"], ["lenkakralova", "lenka-kralova"],
        ["jitkamandalam", "jitka-mandalam"], ["eliskakodysova", "eliska-kodysova"], ["marketasetinova", "marketa-setinova"],
        ["dianavera", "diana-vera"], ["kristynapracharova", "kristyna-pracharova"],
        // Joan pod celým jménem podle profilu lektorky na webu Subspace (Jakub 23. 11. 2026)
        ["joan", "joan-von-brook"],
      ].map(([z, na]) => ({ source: `/host/${z}`, destination: `/host/${na}`, permanent: true })),
    ];
  },
};

export default nextConfig;
