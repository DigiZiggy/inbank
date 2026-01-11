import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const webpackConfig = (env): Configuration => ({
    entry: path.resolve(__dirname, './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.less', '.css'],
        alias: {
            components: path.resolve(__dirname, 'src/components'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            // },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
    ],
});

export default webpackConfig;