/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
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
    },
};

module.exports = nextConfig;
