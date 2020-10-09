const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = require("./config");

module.exports = {
    entry: {
        app: path.resolve(config.sourcePath, "index.tsx"),
        vendor: ["react", "react-dom"]// 不变的代码分包
    },
    output: {
        filename: "js/[name].bundle.js",
        path: config.buildPath,
        publicPath: config.publicPath,
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(j|t)sx?$/,
                        use: "babel-loader"
                    },
                    {
                        test: /\.(html)$/,
                        loader: "html-loader"
                    },
                    {
                        test: /\.(less|css)$/,
                        use: ["style-loader", "css-loader", "less-loader"]// 将 Sass 编译成 CSS-》将 CSS 转化成 CommonJS 模块-》将 JS 字符串生成为 style 节点
                    },
                    {
                        test: /\.(svg|jpg|jpeg|bmp|png|webp|gif|ico|ttf)$/,
                        loader: "url-loader",
                        options: {
                            // limit: 8 * 1024, // 小于这个大小的图片，会自动base64编码后插入到代码中
                            name: "img/[name].[hash:8].[ext]",
                            outputPath: config.buildPath,
                            publicPath: config.publicPath
                        }
                    },
                    {
                        loader: "file-loader",
                        // Exclude `js` files to keep "css" loader working as it injects
                        // it's runtime that would otherwise be processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }

        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx"], // 自动判断后缀名，引入时可以不带后缀
        alias: {
            ...config.pathAlias
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "public", ignore: ["index.html"] }
        ]),
        new HtmlWebpackPlugin({
            template: config.indexHtmlPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeOptionalTags: false,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                removeAttributeQuotes: true,
                removeCommentsFromCDATA: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
            VERSION: JSON.stringify(`Version_${new Date().toUTCString()}`)
        })
    ]
};
