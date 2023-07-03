const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/main.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	resolve: {
    extensions: [".tsx", ".ts", ".js"],    
  },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: [
					{loader: 'babel-loader'}
				]
			},{
				test: /\.(ts|tsx)$/, 
        loader: "ts-loader" 
			},{
				test: /\.css$/i,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules', 'react-toastify/dist/ReactToastify.css')],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
			},{
				test: /\.(jpe?g|png|gif|svg)$/i, 
				loader: 'file-loader',
				options: {
					name: '/public/icons/[name].[ext]'
				}
			}
		]
	},
	
}