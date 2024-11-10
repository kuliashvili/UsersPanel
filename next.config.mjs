/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
