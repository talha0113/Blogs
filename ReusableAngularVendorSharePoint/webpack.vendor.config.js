var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        "vendor": ["./vendor.ts"]
    },
    output: {
        path: path.resolve(process.cwd()),
        filename: "[name].js",
        library: ["angular", "[name]"],
        sourceMapFilename: "[name].js.map",
        chunkFilename: '[id].chunk.js',
        pathinfo: true
    },
    resolve: {
        extensions: [
            ".ts",
            ".js"
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: '[name]-manifest.json',
            name: "angular.[name]"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: './tsconfig.json' }
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(js)$/,
                enforce: "pre",
                use: [
                    { loader: 'source-map-loader' }
                ]
            }
        ]
    }
};