/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['files.stripe.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'files.stripe.com',
			},
		],
	},
};

module.exports = nextConfig;
