/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'links.papareact.com',
            'platform-lookaside.fbsbx.com',
            'firebasestorage.googleapis.com',
            'randomuser.me',
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;
