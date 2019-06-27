# zerokara-react

An opinionated boilerplate for a React web application using `redux-saga`, composed of various libraries that I usually use and some utilities codes.

## Quick Start

1. Clone this project.

``` bash
git clone https://github.com/happyhang/zerokara-react.git
```

2. Install dependencies.

``` bash
yarn install
```

3. Run webpack server for development.

``` bash
yarn start
```

The server will be hosted in `http://localhost:8080`.

4. Build source for deployment.

``` bash
yarn build
```

The built output will be in `/dist/` folder.

## Command List

Use `yarn [command]` to run.

`start` - Start development webpack server.

`build` - Build source.

`analyse` - Analyse production build (using webpack analyser)

## Components

This boilerplate will have the following dependencies specified in `package.json`.

### Core

- React 16.6
  - prop-types
- Redux
  - react-redux
- Webpack 4
  - babel-loader
    - babel/polyfill
    - @babel/core
    - @babel/preset-env
    - @babel/preset-react
  - file-loader
  - css-loader
  - sass-loader
  - style-loader
  - source-map-loader
  - eslint-loader
  - style-loader
  - url-loader
  - clean-webpack-plugin
  - html-webpack-plugin
  - mini-css-extract-plugin
  - optimize-css-assets-webpack-plugin
  - terser-webpack-plugin
  - webpack-cli

### Redux Middlewares

- redux-saga
- redux-logger
- redux-persist

### UI & Styling

- Bootstrap 4.1
- node-sass
- react-popper
  - popper.js
- react-modal
- react-toastify

### SPA Routing

- react-router 4
  - connected-react-router
  - history
  - react-router-dom

### Form

- Formik
- react-datetime
- react-number-format
- react-dropzone
- react-select
- big.js

### Utilities Libraries

- axios
- jquery (Needed by bootstrap)
- immer
- reselect
- moment
- query-string
- js-cookie
- react-onclickoutside

### Development & Optimization

- eslint
  - eslint-config-airbnb
  - eslint-import-resolver-alias
  - eslint-plugin-import
  - eslint-plugin-jsx-a11y
  - eslint-plugin-react
  - eslint-plugin-react-hooks
- redux-devtools-extension
- webpack-bundle-analyzer

## Configuration & Environment variables

There are 3 predefined environments in this boilerplate: `development`, `staging` and `production`. You can add additional environment(s) if you want to.

You can set up environment configurations (that will be available throughout your codebase via `process.env.VAR_NAME`) in `/config/env.[environment].js` file.

## Contributing

This boilerplate is more for my personal use but any issue or pull request is welcomed too!
