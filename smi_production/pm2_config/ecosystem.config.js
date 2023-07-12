module.exports = {
  apps : [
        {
                name   : "backend",
                cwd : "../src/backend",
                script: "nodemon",
                args: "server",
                env:{
                        NODE_ENV: "production"
        }
        },
        {
                name : "frontend",
                cwd: "../..",
                script: "npm",
                args: "start",
                env: {
                        NODE_ENV: "production"
                        }
        },
]
}
     