import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Adjust the size limit as needed
    },
  },
};

export default nextConfig;
