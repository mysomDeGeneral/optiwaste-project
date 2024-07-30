const withPWA = require("@ducanh2912/next-pwa").default({
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    disable: false,
    register: true,
    skipWaiting: true,
    customWorkerSrc: "service-worker",
    customWorkerDest: "somewhere-else", // defaults to `dest`
    customWorkerPrefix: "not/a-worker",
   
  });
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    exports: 'output',
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'https://optiwaste-project.onrender.com/api/:path*',
    //         },
    //     ];
    // },
    reactStrictMode: true,

    images: {
        unoptimized: true,
    },

    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: 'empty'
          };
        }
        return config;
      },

    rewrites: async () => [
        {
            source: '/firebase-messaging-sw-js',
            destination: '/_next/static/firebase-messaging-sw.js',
        },
    ],
};

module.exports = withPWA(nextConfig);

