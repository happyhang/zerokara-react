const prodConfigFunc = require('./webpack.config.prod');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

let prodConfig = prodConfigFunc();
prodConfig.plugins.push(new BundleAnalyzerPlugin());

prodConfig = {
  ...prodConfig,
  
  // Continue on error. We just want to analyse webpack.
  bail: false,

  // No sourcemap needed to speedup compiling.
  devtool: false,
};

module.exports = prodConfig;
