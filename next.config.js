/** @type {import('next').NextConfig} */
const nextConfig = {
  // Retirer output: 'export' pour permettre les routes API
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Exclure le dossier supabase du build
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    // Ignorer les fichiers Supabase Edge Functions
    config.module.rules.push({
      test: /supabase\/functions/,
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
