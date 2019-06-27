const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Define the project root path.
const projectPath = path.resolve('../');

// Define the application source folder. All application code should only be here.
const appSrc = path.resolve('./src');

// Define the public asset folder.
const publicResourceSrc = path.resolve('./public');
const publicHtml = path.join(publicResourceSrc, 'index.html');

// Get the environment variables
const getEnvVariables = env => require(`./env.${(env && env.APP_ENV) || 'dev'}`);

module.exports = env => ({
  mode: 'development',

  // You can add some polyfills before index.tsx.
  entry: ['./config/polyfill.js', './src/index.jsx'],

  devtool: 'cheap-module-source-map',
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
      'assets': path.join(appSrc, 'assets'),
    },
  },
  devServer: {
    // This needs to enabled for BrowserRouter so that it serves index.html on other routes.
    historyApiFallback: true
  },
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'app.js',

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
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
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
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: publicHtml,
    }),
    // Copy public assets.
    new CopyWebpackPlugin([
      {
        from: publicResourceSrc,
        ignore: [publicHtml],
      },
    ]),
  ],
  // Turn off performance hints during development because we are not on optimization stage yet.
  // You may want to turn this on when file size optimization starts to become a need.
  performance: {
    hints: false,
  },
});
