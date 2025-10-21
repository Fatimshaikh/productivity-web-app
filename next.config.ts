import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: 'public',
  disable: isDev, // disable PWA in dev for faster refresh
  register: true,
  skipWaiting: true,
})(nextConfig);
