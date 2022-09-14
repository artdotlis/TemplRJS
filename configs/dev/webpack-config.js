const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PrConf = require('./project.json');

function createCopyPath() {
    const path = [];
    for (const type in PrConf.copy) {
        for (const frto in PrConf.copy[type]) {
            path.push(PrConf.copy[type][frto]);
        }
    }
    return path;
}

module.exports = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: 'js/[name].[fullhash].bundle.js',
        path: path.resolve(__dirname, '../../public'),
        publicPath: '/',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: { chunks: 'all' },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: /^\**!|@preserve|@license|@cc_on/i,
            }),
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['runtime', 'index'],
        }),
        new miniCssExtractPlugin({
            filename: './css/[name].[fullhash].bundle.css',
        }),
        new CopyPlugin({
            patterns: createCopyPath(),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
        ],
    },
};
