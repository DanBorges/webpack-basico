const modeoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UflifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: modeoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer: {
        contentBase: "./public",
        port: 9000
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'estilo.css'
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            // test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader', //Add css a DOM
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: ['file-loader']
        } ]
    }
}