import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  reactStrictMode: true,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind v4 via its Turbopack loader (replaces postcss.config.mjs).
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
