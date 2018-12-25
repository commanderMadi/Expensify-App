const path = require('path');

const CSSExtractPlugin = require('mini-css-extract-plugin');



module.exports = (env) => {
    console.log('environment', env);
    return {
        mode: 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
    
                {   use: [
                    {
                        loader: CSSExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ],
                    test:/\.s?css$/
                }
            ]
        },
        plugins: [
            new CSSExtractPlugin({
                filename: 'styles.css'
            })
        ],
        devtool: env === 'production' ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
}
