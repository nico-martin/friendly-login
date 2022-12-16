const path = require("path");

module.exports = (env) => {
  const dev = env.WEBPACK_WATCH || false;
  return {
    entry: "./assets/src/index.ts",
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "login.js",
      path: path.resolve(__dirname, "assets/dist"),
    },
    mode: dev ? "development" : "production",
  };
};
