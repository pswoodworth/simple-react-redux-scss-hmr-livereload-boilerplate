var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      'whatwg-fetch',
      "./src/js/entry.js"
    ],
    contentBase: "localhost:3000",
    historyApiFallback: true,
    output: {
        path: __dirname,
        filename: "./public/build/app.js",
        publicPath: "http://localhost:8080/"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot', 'babel']
        },
      ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};
