/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
import path from "path";
import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import RemarkHTML from "remark-html";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const module = {
    entry: {
        index: "./src/main.ts"
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "public/",
        path: path.resolve(__dirname, "./public/")
    },
    plugins: [
        new CleanWebpackPlugin({
            dangerouslyAllowCleanPatternsOutsideProject: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            inject: true // 預設為 true
        }),
        new CopyPlugin({
            patterns: [
                { from: "favicon.ico", to: "favicon.ico" },
                // { from: "index.html", to: "index.html" },
                // { from: "css", to: "css" },
                { from: "img", to: "img" }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: [
                    {
                        loader: "babel-loader",
                        options: { presets: ["@babel/preset-env"] }
                    },
                    { loader: "ts-loader" }
                ]
            },
            {
                test: /\.js$/i,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] }
                }
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "remark-loader",
                        options: {
                            remarkOptions: {
                                plugins: [RemarkHTML]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.geojson$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: { extensions: [".ts", ".js"] }
};

export default module;
