const resolve = require('path').resolve;
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack build require absolute path
const BUILD_DIR = resolve(__dirname, 'dist');
const PUBLIC_PATH = resolve(__dirname, '/');
const SRC_DIR = resolve(__dirname, 'src');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: mode,
    // be able to debug with the source code
    devtool: 'source-map',
    entry: SRC_DIR + '/index.js',
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
        publicPath: PUBLIC_PATH
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
        })
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
