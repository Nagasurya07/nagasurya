/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Next.js defaults; no custom turbopack root to avoid relative path issues
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  images: {
    // Allow trusted external image hosts used by certificate images
    remotePatterns: [
      { protocol: 'https', hostname: 'images.credly.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img-a.udemycdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.codecademy.com', pathname: '/**' }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
