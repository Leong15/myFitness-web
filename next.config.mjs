/** @type {import('next').NextConfig} */
const nextConfig = {
    webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
    };
    return config;
  },
};

export default nextConfig;
