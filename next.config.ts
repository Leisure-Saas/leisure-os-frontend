// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menambahkan blok typescript di sini
  typescript: {
    // MEMERINTAHKAN NEXT.JS UNTUK MENGABAIKAN ERROR TIPE SAAT BUILD
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
