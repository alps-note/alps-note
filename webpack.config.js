const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  entry: './src/js/index.js',
  output: {
    filename: argv.mode === 'production' ? 'build/bundle.min.js' : 'build/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }, 
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader']
    }
  ]},
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!assets',
        '!assets/**/*',
        '!index.html',
        '!layout/**/*',
        '!layout',
        '!manifest.json',
        '!build/**/*',
        '!build',
        '!sw.js'
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8000,
  }
});
