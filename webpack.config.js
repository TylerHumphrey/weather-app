const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  entry: "./src/js/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather App"
    })
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean:true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  }
}