const withPWA = require("@ducanh2912/next-pwa").default({
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    disable: false,
    register: true,
    skipWaiting: true,
    sw: '/sw.js',
    customWorkerSrc: "service-worker",
    customWorkerDest: "somewhere-else", // defaults to `dest`
    customWorkerPrefix: "not/a-worker",
    // cacheOnFrontEndNav : true,
    // aggresiveFrontEndNavCaching : true,
    // reloadOnOnline : true,
    // swcMinify : true,
    // workboxOptions: {
    //   disableDevLogs: true,
    // },
  });
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    // exports: 'output',
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

    experimental: {
        missingSuspenseWithCSRBailout: false,
        fontLoaders: [
            { loader: '@next/font/google', options: { subsets: ['latin'] } },
          ],
    },
};

module.exports = withPWA(nextConfig);

