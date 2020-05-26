const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'IS_PRODUCTION_ENV': process.env.NODE_ENV === 'production',
      'BUILD_TIME': new Date().getTime(),
    })
  ]
}
