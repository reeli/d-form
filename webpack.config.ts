import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration } from "webpack";

const webpackConfig = {
  context: path.resolve(__dirname, "./style-guide"),
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]-[hash].js",
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["raw-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React UI Components",
      template: "./index.html",
    }) as any,
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    modules: [__dirname, "node_modules"],
  },

  mode: (process.env.NODE_ENV as any) || "development",
  devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
  devServer: {
    port: 9000,
    compress: true,
    open: true,
    historyApiFallback: true,
  },
} as Configuration;

export = webpackConfig;
