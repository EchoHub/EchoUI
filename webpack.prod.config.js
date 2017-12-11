module.exports = {
    entry: __dirname + "/assets/scripts/main.js",
    output: {
        path: __dirname + "/_build",
        filename: "echoui.bundle.min.js"
    },
    devServer: {
        contentBase: "./page",//本地服务器所加载的页面所在的目录
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
            }
        ]
    }
}