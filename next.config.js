/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  runtimeCaching,
  buildExcludes: [
    /\/*server\/middleware-chunks\/[0-9]*[a-z]*[A-Z]*\.js$/,
    /middleware-manifest\.json$/,
    /middleware-runtime\.js$/,
    /\.js$/,
    /\.css$/,
    /^.+\\_middleware\.js$/,
    // /_buildManifest.js$/,
    // /_ssgManifest.js$/,
    /^.+\\_buildManifest.js$/,
    /^.+\\_app\.js$/,
    /^.+\\_document\.js$/,
    /^.+\\_error\.js$/,
    /^.+\\_app\.js\.map$/,
    /^.+\\_document\.js\.map$/,
    /^.+\\_error\.js\.map$/,
  ],
  publicExcludes: ["!robots.txt"],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  swcMinifyOptions: {
    mangle: {
      keepClassName: true,
    },
  },
  images: {
    domains: [
      "exoplanets.nasa.gov",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    nextScriptWorkers: true,
    esmExternals: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = withPWA(nextConfig);
