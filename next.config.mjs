/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.*"],
  serverExternalPackages: ["@better-auth/kysely-adapter"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
