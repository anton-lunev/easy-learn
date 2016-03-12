'use strict';

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIR = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

module.exports = {

    entry: DIR.src + '/app',

    output: {
        path: DIR.dist,
        filename: '[name].bundle.js',
        chunkFilename: "[id].chunk.js"
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {
            compat: path.join(DIR.src, 'compat'),
            components: path.join(DIR.src, 'components'),
            services: path.join(DIR.src, 'services')
        }
    },

    plugins: [
        new CleanWebpackPlugin([DIR.dist], {
            root: __dirname,
            verbose: true
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ]),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            async: true
        })
    ],

    module: {
        preLoaders: [
            {
                // test: /\.js$/,
                // loader: 'eslint',
                // exclude: /node_modules|bower_components/
            }
        ],
        loaders: [
            {
                test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
                loader: 'file'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|bower_components/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /(\.eot|\.ttf|\.woff2?|\.svg)$/,
                loader: 'url'
            }
        ]
    }
};
