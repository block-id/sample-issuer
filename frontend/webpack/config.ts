import * as path from 'path';
import * as webpack from 'webpack';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: webpack.Configuration = {
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../../backend/static/js/build/'),
    filename: '[name].build.js',
  },

  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   eslint: {
    //     files: "./src/**/*",
    //   },
    // }),
  ],
};

export default config;
