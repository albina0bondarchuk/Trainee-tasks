const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    let config = {}

    if(isProd) {
        config = {
            ...config,
            minimizer: [
                new CssMinimizerWebpackPlugin(),
                new TerserWebpackPlugin()
            ]
        }
    }
    
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'client'),
    mode: 'development',
    entry:  {
        main: ['@babel/polyfill','./js/index.js']
    },
    output: {
        filename: `./js/${filename('js')}`,
        path:path.resolve(__dirname, 'app/client')
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    // devServer: {
    //     port: 3000
    // },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            inject: 'body',
            scriptLoading: 'defer',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPugin({
            filename: `./css/${filename('css')}`
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        ]
    },
    optimization : optimization()
}

