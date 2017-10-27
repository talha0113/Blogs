var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        app: "./main.ts"
    },

    devtool: "source-map",

    output: {
        path: path.resolve(process.cwd()),
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        chunkFilename: '[id].chunk.js',
        pathinfo: true
    },

    resolve: {
        extensions: [
            ".tsx",
            ".ts",
            ".js"
        ]
    },

    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' }),
        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require('angular.vendor/vendor-manifest.json')
        }),
    ],

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: './tsconfig.json' }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }

                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: [
                    {
                        loader: 'file-loader?name=assets/[name].[hash].[ext]'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: true,
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }]
                }),
                exclude: [path.resolve(process.cwd())]
            },
            {
                test: /\.css$/,
                include: [path.resolve(process.cwd())],
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
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