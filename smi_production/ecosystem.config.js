module.exports = {
    apps : [{
      name   : "frontend",
      script : "./package.json",
      args   : "limit"
    },{
      name   : "backend",
      script : "./src/backend/package.json",
      args   : "rotate"
    }]
  }
     