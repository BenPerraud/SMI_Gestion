module.exports = {
    apps : [
      {
          name   : "backend",
          script : "./smi_production/src/backend/server.js",
        },
        {
          name   : "frontend",
          script : "./smi_production",
          env_production: {
            NODE_ENV: "production",
            PORT: 3000,
            exec_mode: "cluster_mode",
          }
        }
    ]
  }
     