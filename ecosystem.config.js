module.exports = {
  apps : [{
    name   : "QA Server",
    script : "./node_modules/.bin/ts-node",
    args : "./server/index.ts",
    watch  : true,
    interpreter : "none",
    instances : 8,
    exec_mode : "cluster",
  }]
}
