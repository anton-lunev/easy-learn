'use strict';

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIR = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist1')
};

module.exports = {

    entry: {
        'main': DIR.src + '/app'
    },

    output: {
        path: DIR.dist,
        filename: '[name].bundle.js',
        chunkFilename: "[id].chunk.js"
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            // compat: path.join(DIR.src, 'compat'),
        //     components: path.join(DIR.src, 'components'),
        //     services: path.join(DIR.src, 'services')
        }
    },

    plugins: [
        new CleanWebpackPlugin([DIR.dist], {
            root: __dirname,
            verbose: true
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            async: true
        }),

        new CopyWebpackPlugin([
            { from: DIR.src + '/images', to: 'images'},
            { from: DIR.src + '/main.js'},
            { from: DIR.src + '/package.json'}
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
                test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
                loader: 'file'
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate!babel',
                exclude: /node_modules|bower_components/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[name]',
                    angularBaseWorkaround: true
                })
            },
            {
                test: /(\.eot|\.ttf|\.woff2?)$/,
                loader: 'url'
            }
        ]
    }
};
