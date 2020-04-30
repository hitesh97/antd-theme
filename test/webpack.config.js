const path = require('path');
const LessThemePlugin = require('../plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: './test/index.jsx',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['import', {
                  libraryName: 'antd',
                  style: true,
                }],
              ],
              presets: ['react-app'],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: LessThemePlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              compress: true,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LessThemePlugin({
      variables: ['primary-color'],
      themes: [
        {
          name: 'dark',
          filename: require.resolve('antd/lib/style/themes/dark.less'),
        },
        {
          name: 'compact',
          filename: require.resolve('antd/lib/style/themes/compact.less'),
        },
        {
          name: 'aliyun',
          filename: require.resolve('@ant-design/aliyun-theme/index.less'),
        },
      ],
    }),
  ],
};