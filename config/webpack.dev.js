const path = require('node:path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, '../public'),
        open: true,
        compress: true,
        port: 3000,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
