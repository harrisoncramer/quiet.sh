const path = require("path");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV, // "development" or "production"
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    publicPath: "/dist/",
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://localhost:3000/",
        pathRewrite: { "^/api": "" },
        secure: false,
        logLevel: "debug",
      },
    },
  },
};
