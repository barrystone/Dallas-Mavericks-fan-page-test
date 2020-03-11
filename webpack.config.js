const path= require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const PATHS = {
    views: path.resolve(__dirname, 'src'),
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports={
	entry:{

        index:'./src/index.js',       
              
    },    
	output: {
        path: path.join(__dirname, 'dist'),
        filename: './js/[name].min.js',
       
    },module: {
        rules: [ 
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },{
                test: /\.(eot|woff|woff2|[ot]tf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/',
                        publicPath: '../fonts/'
                    }
                }
            },
            {
                test: /.*font.*\.svg$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/',
                        publicPath: '../fonts/'
                    }
                }
            },
            {
                test: /^(?!.*font).*\.svg$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './images/',
                        publicPath: '../images/'
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|webp)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './images/',
                        publicPath: '../images/'
                        
                    }
                }
            },{
                test: /\.(sa|sc|c)ss$/,
                use: [
                	{
                        loader: MiniCssExtractPlugin.loader,
                        
                    },
                	'css-loader',
                	{
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer'),
                                    require('cssnano')({preset: ['default', {discardComments: {removeAll: true}}]})
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    }
                }
            })
        ]
    },plugins: [ 
        new CleanWebpackPlugin(), 
        new webpack.ProvidePlugin({
          '$': 'jquery',
          'jQuery':'jquery'
        }),       
        new PurgecssPlugin({
            whitelist: function () {
                return [];
            },
            whitelistPatterns: function () {
                return [];
            },
            whitelistPatternsChildren: function () {
                return [];
            },
            paths: glob.sync(`${PATHS.views}/**/*`, {nodir: true}),
        }),
         new MiniCssExtractPlugin({ 
               
            filename: './css/[name].min.css',
             chunkFilename:'[id].css'
                     
        }),

        new HtmlWebpackPlugin({
            template: './src/Dallas Mavericks fan page_homepage.html',
            filename: './index.html',
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                sortAttributes: true,
                useShortDoctype: true
            },
            inject: false
        })
    ]
};
