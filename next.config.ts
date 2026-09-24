import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // concept prototype: keep it private from crawlers
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
  // the shop page was /casa-morph until Phase A; Morph does not use that name
  async redirects() {
    return [{ source: '/casa-morph', destination: '/magazin', permanent: true }];
  },
};

export default nextConfig;
