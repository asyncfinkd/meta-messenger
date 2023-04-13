/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["1000logos.net", "scontent.ftbs2-2.fna.fbcdn.net"]
  }
}

module.exports = nextConfig
