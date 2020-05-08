const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
      
      'context': path.join(appSrc, 'context'),
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
                  // This will help to polyfill the needed components based on target browser.
                  // It will automatically target browsers specified in browserslist.
                  useBuiltIns: "entry",
                  corejs: 3,
                },
              ],
            ],
            plugins: [
              // Plugin to enable CSS Module
              ['react-css-modules', {
                generateScopedName: '[local]-[hash:base64:10]',
                // Only include .module.scss files.
                // Using this convention allows us to safely
                // use other global styles not inteded to be modularized.
                exclude: '^(?!.*module).+\.(scss)$',
                filetypes: {
                  '.scss': {
                    'syntax': 'postcss-scss',
                  },
                },
                attributeNames: {
                  overlayStyleName: "overlayClassName",
                  bodyOpenStyleName: "bodyOpenClassName",
                },
              }]
            ],
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              // CSS Module requires the below 2 configs.
              modules: {
                localIdentName: '[local]-[hash:base64:10]',
                // This is needed so that it does not compile styles intended to be global.
                // (eg. third party css)
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  return loaderContext.resourcePath.includes('node_modules')
                    || loaderContext.resourcePath.includes('styles/')
                    || loaderContext.resourcePath.includes('styles\\')
                    ? localName
                    : false;
                },
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('postcss-import'),
                require('autoprefixer'),
                require('postcss-preset-env'),
                require('cssnano')({ preset: 'default' }),
              ],
            }
          },
          'sass-loader?sourceMap',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              // Add all SASS variables/mixins to inject to every file here.
              resources: [
                './src/styles/_config.scss',
                './src/styles/bootstrap-override.scss',
                './node_modules/bootstrap/scss/_functions.scss',
                './node_modules/bootstrap/scss/_variables.scss',
                './node_modules/bootstrap/scss/mixins/_breakpoints.scss',
              ],
            },
          }
        ],
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
      }
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
    // Extract css to separate files.
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    // Code splitting.
    splitChunks: {
      chunks: 'all',
    }
  },
  // Turn off performance hints during development because we are not on optimization stage yet.
  // You may want to turn this on when file size optimization starts to become a need.
  performance: {
    hints: false,
  },
});
