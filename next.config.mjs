/** @type {import('next').NextConfig} */
const nextConfig = {
  // Broadest allowlist Next.js supports (** or * alone are rejected).
  // Matches any hostname with a dot: LAN IPs, local domains, tunnels, etc.
  allowedDevOrigins: ['**.*'],
  compiler: {
    emotion: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
