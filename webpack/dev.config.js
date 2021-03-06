const path = require('path');
const webpack = require('webpack');

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

const baseDevConfig = () => ({
	devtool:       'eval-cheap-module-source-map',
	entry:         {
		app:        [customPath, hotScript, path.join(__dirname, '../chrome/extension/app')],
		background: [customPath, hotScript, path.join(__dirname, '../chrome/extension/background')],
	},
	devMiddleware: {
		publicPath: `http://${host}:${port}/js`,
		stats:      {
			colors: true,
		},
		noInfo:     true,
		headers:    {'Access-Control-Allow-Origin': '*'},
	},
	hotMiddleware: {
		path: '/js/__webpack_hmr',
	},
	output:        {
		path:          path.join(__dirname, '../dev/js'),
		filename:      '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
	},
	plugins:       [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
		new webpack.DefinePlugin({
			                         __HOST__:      `'${host}'`,
			                         __PORT__:      port,
			                         'process.env': {
				                         NODE_ENV: JSON.stringify('development'),
			                         },
		                         }),
	],
	resolve:       {
		extensions: ['', '.js'],
	},
	node:          {
		fs: 'empty',
	},
	module:        {
		loaders: [
			{
				test:    /\.(js|jsx)$/,
				loader:  'babel',
				query:   {
					cacheDirectory: true,
					plugins:        ['transform-decorators-legacy'],
					presets:        ['env', 'es2015', 'stage-0', 'react', 'react-hmre']
				},
				exclude: /node_modules/,
			},
			{
				test:    /\.css$/,
				exclude: ['/node_modules/'],
				loaders: [
					'style',
					'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'postcss',
				],
			},
		],
	},
});

const appConfig = baseDevConfig();

module.exports = [appConfig];
