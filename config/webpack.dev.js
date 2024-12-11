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
        port: process.env.PORT,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VOTE_SEAT_API_URL': JSON.stringify(process.env.VOTE_SEAT_API_URL),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
