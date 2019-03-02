const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'eval',
    entry: ["@babel/polyfill", "./src/app.js"],
    target: 'node',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new NodemonPlugin(),
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.dev.js'
    },
    externals: {
        // ignoring unused knex drivers to prevent webpack error
        'sqlite3': 'sqlite3',
        'mariasql': 'mariasql',
        'mssql': 'mssql',
        'mssql/lib/base': 'mssql/lib/base',
        'mssql/package.json': 'mssql/package.json',
        'mysql': 'mysql',
        'oracle': 'oracle',
        'strong-oracle': 'strong-oracle',
        'oracledb': 'oracledb',
        'pg': 'pg',
        'pg-query-stream': 'pg-query-stream',
        'tedious': 'tedious',
    }
};
