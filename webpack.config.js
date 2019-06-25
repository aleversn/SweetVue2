var path = require('path')
var webpack = require('webpack')
const bundleOutputDir = './dist'; ///////输出目录

module.exports = {
    context: __dirname,
    entry: { main: './src/SweetVueDev.js' },  ////////////vue.js程序根目录
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'url-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),  // 告诉服务器为该路径提供服务
        host: 'localhost', 
        port:8080,    //端口
        open:true,    //自动打开页面，
        hot:true,    //开启热更新，
        compress: true, // 服务器压缩式，一般为`true`，
        inline: true, // 默认为true,在打包时会注入一段代码到最后的js中，用来监视页面的改动而自动刷新页面
        publicPath: 'dist/' //它与out.publicPath的值是一样的，值为上面contentBase目录的子目录
    },
    performance: {
        hints: false
    },
    output: {
        path: path.join(__dirname, bundleOutputDir),
        filename: 'SweetVue.min.js',
        publicPath: 'dist/'
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}