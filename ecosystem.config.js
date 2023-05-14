module.exports = {
  apps: [
    {
      name: 'super-chat-api',
      script: 'dist/main.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
