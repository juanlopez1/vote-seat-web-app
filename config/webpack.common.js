const path = require('node:path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@vote-seat-web-app': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext]',
                },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: 'assets',
                    globOptions: {
                        ignore: ['**/favicon.ico', '**/index.html', '**/manifest.json', '**/robots.txt'],
                    },
                },
                {
                    from: path.resolve(__dirname, '../public/favicon.ico'),
                    to: path.resolve(__dirname, '../dist'),
                },
                {
                    from: path.resolve(__dirname, '../public/manifest.json'),
                    to: path.resolve(__dirname, '../dist'),
                },
                {
                    from: path.resolve(__dirname, '../public/robots.txt'),
                    to: path.resolve(__dirname, '../dist'),
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
    ],
};
