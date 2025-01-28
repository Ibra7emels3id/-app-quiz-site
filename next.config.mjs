/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['example.com', 'readymadeui.com'],
    },
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            publicPath: '/_next/static/images',
                            outputPath: 'images',
                        },
                    },
                ],
            });
        }

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/blog/:slug',
                destination: '/posts/:slug',
            },
        ];
    },
};

export default nextConfig;
