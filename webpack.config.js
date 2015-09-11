var KOA_SERVER_PORT = 9998;
var HOTLOADER_SERVER_PORT = 9999;

var path = require('path');
var webpack = require('webpack');
console.log('dirname', __dirname);

module.exports = {
  KOA_SERVER_PORT: KOA_SERVER_PORT,
  HOTLOADER_SERVER_PORT: HOTLOADER_SERVER_PORT,
  debug: true,
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:' + HOTLOADER_SERVER_PORT,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'frontend', 'js', 'app.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'backend', 'static'),
    filename: '[name].js',
    // http://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'frontend')
      }, {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: 'file-loader',
        include: path.join(__dirname, 'frontend'),
        query: {
          name: 'img/[name].[ext]'
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: path.join(__dirname, 'frontend')
      }
    ]
  },
  devtool: 'cheap-source-map'
};