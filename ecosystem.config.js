module.exports = {
  apps: [{
    name: 'sugang-fake',
    script: 'server.js',
    instances: 0,
    exec_mode: 'cluster',
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3002,
    },
    source_map_support: false,
    autorestart: true,
  }],
};
