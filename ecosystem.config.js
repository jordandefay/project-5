module.exports = {
  apps: [{
    name: 'voix-du-monde-arabe',
    script: 'npm',
    args: 'start',
    cwd: '/home/jd/project-5',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    time: true,
    // Redirection des logs vers des fichiers temporaires
    error_file: '/tmp/voix-du-monde-arabe-error.log',
    out_file: '/tmp/voix-du-monde-arabe-out.log',
    log_file: '/tmp/voix-du-monde-arabe-combined.log'
  }]
}