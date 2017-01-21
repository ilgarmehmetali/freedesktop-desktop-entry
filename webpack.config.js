module.exports = {
  entry: {
    './dist/index.js': './src/index.js'
  },
  output: { path: __dirname, filename: '[name]' },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  }
};
