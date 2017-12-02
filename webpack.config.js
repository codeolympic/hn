let resolve = require('path').resolve;
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack build require absolute path
const BUILD_DIR = resolve(__dirname, 'dist');
const PUBLIC_PATH = resolve(__dirname, '/');
const SRC_DIR = resolve(__dirname, 'src');

module.exports = {
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
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
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
                test: /\.vue$/,
                use: ['vue-loader'],
                include: SRC_DIR
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // load css as module
                    use: 'css-loader?modules&sourceMap&localIdentName="[name]__[local]__[hash:base64:5]"'
                })
            }
        ]
    },
    resolve: {
        // by default vuejs is doing the 'runtime' build which won't include the 'compiler'
        // in that case, any '*.vue' template file won't be compiled.
        // in order to compile the '*.vue' template file, the compiler has be to included.
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        // add '.vue' to import without specifying the file type
        extensions: ['.vue', '.js', '.jsx', '.json', 'css']
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
