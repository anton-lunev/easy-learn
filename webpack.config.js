'use strict';

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let ENV = process.env.npm_lifecycle_event;
let isProd = ENV === 'buildProd';

const DIR = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

let config = {

    entry: {
        'main': './src/app/app.js'
    },

    output: {
        path: './dist',
        filename: '[name].bundle.js',
        chunkFilename: "[id].chunk.js"
    },

    target: 'electron',

    devtool: 'source-map',

    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            compat: path.join(DIR.src, 'compat'),
            images: path.join(DIR.src, 'images'),
            svg: path.join(DIR.src, 'svg'),
            common: path.join(DIR.src + '/app', 'common')
            // components: path.join(DIR.src, 'components'),
            // services: path.join(DIR.src, 'services')
        }
    },

    plugins: [
        new CleanWebpackPlugin([DIR.dist], {
            root: __dirname,
            verbose: true
        }),

        new ExtractTextPlugin("[name].css"),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            async: true
        }),

        new webpack.ProvidePlugin({
            loki: "lokijs"
        }),

        new CopyWebpackPlugin([
            {from: DIR.src + '/images/spinner.svg', to: 'images'},
            {from: DIR.src + '/.package.json', to: 'package.json'},
            {from: DIR.src + '/main.js'}
        ])
    ],

    module: {
        preLoaders: [
            // {
            // test: /\.js$/,
            // loader: 'eslint',
            // exclude: /node_modules|bower_components/
            // }
        ],
        loaders: [
            {
                test: /\.png$/,
                loader: 'url'
            },
            {
                test: /\.js$/,
                loader: `${isProd ? 'ng-annotate!' : ''}babel`,
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?root=~images&sourceMap!less?sourceMap")
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[name]',
                    angularBaseWorkaround: true
                })
            }
        ]
    }
};

// Add build specific plugins
if (isProd) {
    config.devtool = '';
    config.plugins.push(
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),

        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin(),

        // Minify all javascript, switch loaders to minimizing mode
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;
