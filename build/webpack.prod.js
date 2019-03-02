const path = require('path');

module.exports = {
    mode: 'production',
    entry: ["@babel/polyfill", "./src/app.js"],
    target: 'node',
    stats: {
        warnings: false
    },
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
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.prod.js'
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
    },
    optimization: {
        // disabled to prevent an error when running the container on production
        minimize: false
    },
};
