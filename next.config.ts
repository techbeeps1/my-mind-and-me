/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '54.89.179.53',
        port: '8000',
      
      },
    ],
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core",
  ],

  outputFileTracingIncludes: {
    "/api/invoice/[id]": [
      "./node_modules/@sparticuz/chromium/bin/**/*",
    ],
  },
};

module.exports = nextConfig;
