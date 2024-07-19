/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.43.122:5000/api/:path*',
            },
        ];
    },
    reactStrictMode: true,

    images: {
        unoptimized: true,
    },

    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

module.exports = nextConfig;
