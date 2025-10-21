import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // ✅ Ignore ESLint errors during production build (for Vercel)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Ignore TypeScript build errors on Vercel
    ignoreBuildErrors: true,
  },
};

export default withPWA({
  dest: 'public',
  disable: isDev, // disable PWA in dev for faster refresh
  register: true,
  skipWaiting: true,
})(nextConfig);
