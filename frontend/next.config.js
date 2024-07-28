const withPWA = require("@ducanh2912/next-pwa").default({
    customWorkerSrc: "service-worker",
    customWorkerDest: "somewhere-else",
    customWorkerPrefix: "not/a-worker",
    dest: 'public',
    cacheOnFrontEndNav : true,
    aggresiveFrontEndNavCaching : true,
    reloadOnOnline : true,
    swcMinify : true,
    disable : false,
    workboxOptions: {
      disableDevLogs: true,
    },
  });
  
/** @type {import('next').NextConfig} */
const nextConfig = {

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

