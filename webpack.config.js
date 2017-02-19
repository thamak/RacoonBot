var webpack = require('webpack');
// Attente support ES6 par UglifyJS pour "build:prod": "webpack -p --progress"
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  target: 'node',
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      //{ test: /\.ts$/, loader: 'awesome-typescript-loader' }
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.ts', 'd.ts']
  },
  plugins: [
    //   new UglifyJSPlugin({
    //       sourceMap: true
    //   })
  ],
  externals: {
    //'winston': 'require("winston")'
  }
}