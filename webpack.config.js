const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const packageJson = require("./package.json");

function modify(buffer) {
  const manifest = JSON.parse(buffer.toString());
  manifest.version = packageJson.version;
  const manifest_JSON = JSON.stringify(manifest, null, 2);
  return manifest_JSON;
}

module.exports = (env, { mode }) => {
  let config = {
    entry: {
      index: "./src/index.ts",
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: "ts-loader",
          include: [path.resolve(__dirname, "src")],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      plugins: [new TsconfigPathsPlugin({ baseUrl: "./" })],
      fallback: {
        buffer: false,
      },
    },
    output: {
      filename: "[name].js",
      assetModuleFilename: "[name][ext]",
      path: path.resolve(__dirname, "docs"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "I3ushido",
        filename: "index.html",
        template: "./public/index.html",
        inject: "body",
      }),
      // new BundleAnalyzerPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./src/manifest.json",
            to: "./manifest.json",
            transform(content, path) {
              return modify(content);
            },
          },
          {
            from: "./public/assets",
            to: "./assets",
          },
          {
            from: "./public/css",
            to: "./css",
          },
          {
            from: "./public/matrix.js",
            to: "./matrix.js",
          },
          {
            from: "./public/script.js",
            to: "./script.js",
          },
          {
            from: "./public/_config.yml",
            to: "./_config.yml",
          },
        ],
      }),
    ],
  };
  if (mode === "development") {
    config = {
      ...config,
      devtool: "inline-source-map",
      devServer: {
        static: {
          directory: path.join(__dirname, "public"),
        },
        https: true,
        port: 10300,
        compress: true,
      },
    };
  }
  return config;
};
