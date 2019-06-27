const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Define the project root path.
const projectPath = path.resolve('./');

// Define the application source folder. All application code should only be here.
const appSrc = path.resolve('./src');

// Define the public asset folder.
const publicResourceSrc = path.resolve('./public');
const publicHtml = path.join(publicResourceSrc, 'index.html');

// Get the environment variables
const getEnvVariables = env => require(`./env.${(env && env.APP_ENV) || 'staging'}`);

module.exports = env => ({
  mode: 'production',

  // Don't attempt to continue if there are any errors.
  bail: true,

  // You can add some polyfills before index.tsx.
  entry: ['./config/polyfill.js', './src/index.jsx'],

  devtool: 'source-map',
  resolve: {
    extensions: [
      '.mjs',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
    ],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      // To prevent other library using jquery to include the full library (huge!)
      'jquery': 'jquery/dist/jquery.slim.js',
      
      'common': path.join(appSrc, 'common'),
      'main': path.join(appSrc, 'main'),
    },
  },
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].[contenthash].js',

    // This is the URL that app is served from. We use "/" in development.
    publicPath,
  },
  module: {
    rules: [
      {
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
              configFile: "./config/.eslintrc.json"
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: appSrc,
      },
      {
        // Compiles our Javascript source.
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [ 
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                  },
                  // This will help to polyfill the needed components.
                  useBuiltIns: "usage",
                  // Have to specify this for compilation to work.
                  modules: "commonjs"
                },
              ]
            ],
            // Have to ignore this for compilation to work. (https://github.com/babel/babel/issues/8731)
            ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
          },
        }
      },
      {
        // Helps to read the compiled sourcemaps (from either ts output or existing libs)
        // and integrate those when generating the final sourcemap.
        test: /\.(js|jsx)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: appSrc,
      },
      {
        // Compiles css and scss.
        test: /\.s?css$/, // SCSS is superset of CSS, so it can be compiled fine (should be).
        include: appSrc,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        // Grab images.
        test: /\.(jpe?g|png|gif|svg|bmp)$/i,
        include: appSrc,
        loader: require.resolve('url-loader'),
        options: {
          // url-loader will convert the resource as data URI if it is less than this size.
          limit: 10000,
        },
      },
      {
        // Grab other assets.
        test: /\.xlsx$/i,
        include: appSrc,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name]-[hash].[ext]'
        },
      },
    ],
  },
  plugins: [
    // Define additional environment variables to be used in app.
    new webpack.EnvironmentPlugin(getEnvVariables(env)),
    // Delete previous built files before building a new one.
    new CleanWebpackPlugin('dist', {
      root: projectPath,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: publicHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
      },
    }),
    // Copy public assets.
    new CopyWebpackPlugin([
      {
        from: publicResourceSrc,
        ignore: [publicHtml],
      },
    ]),
    // Extract css to separate files.
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    // Webpack 4 default has no CSS minimizer so we have to override it manually to support that.
    minimizer: [
      // Minify JS
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      // Minify CSS
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  performance: {
    hints: "warning",
  },
});
