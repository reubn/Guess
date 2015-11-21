const webpack = require("webpack");
const configFromFile = require("./config")
process.env.NODE_ENV = configFromFile.app.environment

module.exports = {
  entry: [
    "babel-polyfill",
    "./front/index.js"
  ],
  output: {
    path: "./front/compiled",
    filename: "all.js"
  },
  devtool: process.env.NODE_ENV !== "production" ? "source-map" : undefined,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        plugins: ["transform-runtime"],
        presets: ["es2015", "react"]
      }
    }, {
      test: /\.css$/,
      loaders: ["dragonfruit",
                "style",
                "css?" + (process.env.NODE_ENV !== "production" ? "localIdentName=[local]-[name]-[hash:base64:10]&" : "") + "modules=true",
                "autoprefixer?{browsers:['> 1%', 'last 2 versions'], cascade: false}"]
    }, {
      test: /\.(eot)|(svg)|(ttf)|(woff2?)$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"' + process.env.NODE_ENV + '"',
      "__DEVTOOLS__": process.env.NODE_ENV !== "production"
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    modulesDirectories: ["web_modules", "node_modules", "js", "css"],
    extensions: ["", ".js", ".jsx", ".css"]
  }

};
