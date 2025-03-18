const dev = {
    btn: 'ui/buttons/btn/0.tsx',
    event: 'event/0.tsx',
}
// change this to change what tou are working on
const SELECTED = dev.event; 

// ~~~~~

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
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
function p_components(...args) {
    return p_src(`components`, ...args);
}
function p_styles(...args) {
    return p_src('styles', ...args);
}
function p_shared(...args) {
    return p_src('shared', ...args);
}

const config = {
    entry: isProduction ? p_src('index.tsx') : p_components(SELECTED),
    output: {
        path: p_dist(),
        filename: 'bundle.js',
        globalObject: 'this',
        library: {
            name: "front-lib",
            type: "umd"
        },
    },
    devServer: {
        static: p_dist(),
        compress: true,
        port: 3000,
        hot: true,
    },
    externals: isProduction ? {
        react: 'react',
        'react-dom': 'react-dom',
    } : {},
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
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
            styles: p_styles(),
            components: p_components(),
            shared: p_shared(),
            react: path.resolve('./node_modules/react'),
        },
    },
    plugins: [
        new Dotenv({
            path: './.env',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.DEV': JSON.stringify(!isProduction),
        }),
    ],
    mode: isProduction ? 'production' : 'development',
};

module.exports = config;
