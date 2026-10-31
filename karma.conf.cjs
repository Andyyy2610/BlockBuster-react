const process = require('process');

process.env.CHROME_BIN = process.env.CHROME_BIN || 
  `${process.env.LOCALAPPDATA}\\Programs\\Opera GX\\opera.exe`;

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'webpack'],

    files: [
      'src/**/*.spec.js',
      'src/**/*.spec.jsx'
    ],

    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    plugins: [
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-webpack')
    ],

    customLaunchers: {
      OperaGX_Headless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },

    browsers: ['OperaGX_Headless'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  });
};