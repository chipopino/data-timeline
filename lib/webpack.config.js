const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv');
const isProduction = process.env.NODE_ENV === 'production';
const webpack = require('webpack');

dotenv.config();

function p_root(...args) {
    return path.resolve(__dirname, ...args);
}
function p_src(...args) {
    return p_root('src', ...args);
}
function p_dist(...args) {
    return p_root('dist', ...args);
}

const config = {
    entry: p_src('index.tsx'),
    output: {
        path: p_dist(),
        filename: 'bundle.js',
        globalObject: 'this',
        library: {
            name: "lib",
            type: "umd"
        },
    },
    devServer: {
        static: p_dist(),
        compress: true,
        port: 3000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // extreme speed up, but doesnt check types in development, only in build
                        transpileOnly: !isProduction,
                    },
                },
                exclude: [/node_modules/],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            src: p_src(),
        },
        plugins: [
            new TsconfigPathsPlugin({ configFile: './tsconfig.json' }),
        ],
    },
    plugins: [
        new Dotenv({
            path: './.env',
        }),
        //new HtmlWebpackPlugin({
        //    template: './src/index.html',
        //}),
        new webpack.DefinePlugin({
            'process.env.DEV': JSON.stringify(!isProduction),
        }),
    ],
    mode: isProduction ? 'production' : 'development',
};

module.exports = config;
