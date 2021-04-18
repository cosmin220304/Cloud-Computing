// module.exports = {
//   entry: "./src/index.tsx",
//   resolve: {
//     extensions: [".ts", ".tsx", ".js", ".jsx"]
//   },
//   module: {
//     rules: [
//       { 
//         test: /\.js$/, 
//         loader: "babel-loader", 
//         exclude: "/node_modules/" 
//       },
//       { 
//         test: /\.jsx$/, 
//         loader: "babel-loader", 
//         exclude: "/node_modules/" 
//       },
//       {
//         test: /\.tsx?$/,
//         use: "ts-loader",
//         exclude: "/node_modules/",
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           "style-loader",
//           "css-loader",
//           "sass-loader",
//         ],
//       },
//     ],
//   },
// }

const path = require('path')

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: ['./src/assets/atomic.scss', './src/assets/index.scss'],
	output: {
		path: path.resolve(__dirname, 'src', 'assets'),
    filename: 'webpack/editor.blocks.txt',
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader',
            options: {
              options: {},
            }
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	}
}