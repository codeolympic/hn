const resolve = require('path').resolve;
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// webpack build require absolute path
const BUILD_DIR = resolve(__dirname, 'dist');
const PUBLIC_PATH = resolve(__dirname, '/');
const SRC_DIR = resolve(__dirname, 'src');

const devmode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: devmode ? 'development' : 'production',
    // be able to debug with the source code
    devtool: devmode ? 'source-map' : 'none',
    entry: SRC_DIR + '/index.js',
    output: {
        filename: '[name].bundle.js',
        path: BUILD_DIR,
        publicPath: PUBLIC_PATH
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // generate the index.html
        new HtmlWebpackPlugin({
            title: 'HN',
            template: SRC_DIR + '/index.ejs'
        }),
        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/
        }),
        new OptimizeCSSAssetsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: SRC_DIR
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // load css as module
                    'css-loader?modules&sourceMap&localIdentName="[name]__[local]__[hash:base64:5]"'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', 'css']
    },
    // IMPORTANT: the Html-Webpack-Plugin WILL NOT write files to the local
    // file system when it is used by the Webpack-Development-Server
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: BUILD_DIR,
        compress: false,
        port: 9000,
        inline: false // no need when HotModuleReplacement is used
    }
};
