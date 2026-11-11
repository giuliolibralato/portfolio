import type { NextConfig } from "next";

const isPages = process.env.GITHUB_ACTIONS === "true";

const config: NextConfig = {
  output: "export",
  basePath: isPages ? "/portfolio" : "",
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? "/portfolio" : "" },
};

export default config;
