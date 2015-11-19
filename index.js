const http = require("http")

const colors = require("colors/safe")

const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const helmet = require("helmet")

const configFromFile = require("./config")
process.env.NODE_ENV = configFromFile.app.environment

startServer(configFromFile, express())

function startServer(config, app){
  const servers = {}
  // Middleware
  app.use(morgan(":statusColor :method :url :status :response-time ms - :res[content-length] - [:date[clf]]"))
  morgan.token("statusColor", function(req, res){
    return colors[config.app.statusColors[res.statusCode.toString()[0]]]("█")
  })
  app.use(compression())
  app.use(helmet())

  // Routing
  require("./routes")(app, config)

  servers.http = http.createServer(app)
  servers.http.listen(80, function(){
    console.info(colors.blue("Server Started. Port: " + colors.magenta(servers.http.address().port) + " IP: " + colors.magenta(servers.http.address().address)))
  })
}
