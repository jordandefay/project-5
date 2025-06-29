module.exports = {
  apps: [{
    name: 'voix-du-monde-arabe',
    script: 'npm',
    args: 'start',
    cwd: '/root/project-5',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
