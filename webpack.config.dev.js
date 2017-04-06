/**
 * 
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    /*devtool: 'source-map',*/
    entry: [
        'bootstrap-loader','./src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('css/m-dispatch.css'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether"
        })
    ],
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json'],
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.less?$/,
            loaders: [
                'style-loader',
                'css-loader',
                'less-loader?{"sourceMap":true}'
            ],
            include: __dirname
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10240
            }
        },{
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            loader: 'file'
        },{
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url?limit=10000"
        }, {
            test: /\.scss$/,
            loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap'
        }]
    }
};