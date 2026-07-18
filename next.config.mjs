/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => {
    // Generate a unique build ID for cache busting
    return 'build-' + Date.now();
  },
};

export default nextConfig;
