const serveStatic = require("serve-static")

module.exports = function(app){
  // Serve Static Assets
  app.use(serveStatic("front/compiled/", {
    "index": ["../index.html"],
    maxAge: process.env.NODE_ENV === "production" ? "30 days" : "0"
  }))
}
