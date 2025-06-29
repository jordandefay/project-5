/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Configuration webpack pour exclure le dossier supabase
  webpack: (config) => {
    // Ignorer les fichiers Supabase Edge Functions
    config.module.rules.push({
      test: /supabase/,
      loader: 'ignore-loader'
    })
    
    return config
  },
  // Exclure explicitement le dossier supabase
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./supabase/**/*'],
    },
  },
}

module.exports = nextConfig
