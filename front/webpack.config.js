const dev = {
    index: '../index.tsx',
    btn: 'ui/buttons/btn/0.tsx',
    fileUploadBtn: 'ui/buttons/fileUploadBtn/0.tsx',
    loader: 'ui/loader/0.tsx',
    error: 'ui/error/0.tsx',
    event: 'event/0.tsx',
    timeline: 'timeline/0.tsx',
    dealer: 'dealer/0.tsx',
    requestTest: 'request-test/0.tsx',
    lineStrip: 'line-strip/0.tsx',
    chart: 'chart/0.tsx',
    mainPage: 'pages/main/0.tsx',
    context: 'context/0.tsx',
    select: 'modals/select/0.tsx',
}
// change this to change what tou are working on
const SELECTED = dev.mainPage;

// ~~~~~

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
function p_components(...args) {
    return p_src(`components`, ...args);
}
function p_styles(...args) {
    return p_src('styles', ...args);
}
function p_shared(...args) {
    return p_src('shared', ...args);
}
function p_types(...args) {
    return p_src('types', ...args);
}
function p_hooks(...args) {
    return p_src('hooks', ...args);
}
function p_requests(...args) {
    return p_src('requests', ...args);
}

const config = {
    entry: isProduction ? p_src('index.tsx') : p_components(SELECTED),
    output: {
        path: p_dist(),
        filename: 'bundle.js',
    },
    devServer: {
        static: p_dist(),
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
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
            styles: p_styles(),
            components: p_components(),
            shared: p_shared(),
            types: p_types(),
            hooks: p_hooks(),
            requests: p_requests(),
            react: path.resolve('./node_modules/react'),
        },
        plugins: [
            new TsconfigPathsPlugin({ configFile: './tsconfig.json' }),
        ],
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
