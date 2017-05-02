var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
      'whatwg-fetch',
      "./src/js/entry.js" // Your appʼs entry point
    ],
    output: {
        path: __dirname,
        filename: "./public/build/app.js",
    },
    module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel']
          },
        ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {warnings: false},
        output: {comments: false},
        sourceMap: true
      })
    ]
};
