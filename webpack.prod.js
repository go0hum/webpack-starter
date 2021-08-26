const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer  = require('css-minimizer-webpack-plugin');
const Terser  = require('terser-webpack-plugin');
// install libraries 
// npm i -D html-loader html-webpack-plugin
// npm install --save-dev html-loader html-webpack-plugin
// npm i -D webpack-dev-server
// npm i -D css-loader style-loader
// npm i -D mini-css-extract-plugin
// npm install file-loader --save-dev
// npm install copy-webpack-plugin --save-dev
// npm i -D css-minimizer-webpack-plugin terser-webpack-plugin
// pm install --save-dev babel-loader @babel/core
// npm install @babel/preset-env --save-dev
module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: true,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },
    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            //filename: 'index.html'
            template: './src/index.html'
        }),
        
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}