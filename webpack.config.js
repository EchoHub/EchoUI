const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // devtool: 'eval-source-map',
    entry: __dirname + "/assets/scripts/main.js",
    output: {
        path: __dirname + "/_build",
        filename: "echoui.bundle-[hash].js"
    },
    devServer: {
        // contentBase: "./page",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/page/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new ExtractTextPlugin("[name].css"),
        new CleanWebpackPlugin('_build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}