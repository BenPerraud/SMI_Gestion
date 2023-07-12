module.exports = {
    apps : [
      {
          name   : "backend",
          script : "./src/backend/server.js",
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
     