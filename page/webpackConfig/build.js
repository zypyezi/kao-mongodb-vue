const webpack = require('webpack')
const path = require('path')

const SrcPath = path.join(__dirname, '../src')
const DistPath  = path.join(__dirname, '../dist')

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: SrcPath,
    output:{
        path:DistPath,
        filename:'[name].bundle.js'
    },


    resolve:{
        alias:{
            vue: 'vue/dist/vue.js'
        }
    },

    mode:'development',

    // 热更新
    devServer:{
        host:'0.0.0.0',
        port:'8080',
        open:true,
        hot:true,
        proxy:{
            '/zyp' :{
                target : 'http://localhost:3000',
                changeOrigin : true
            }
        }
    },

    plugins:[
        new VueLoaderPlugin(),   // vue-loader 在15版本之后需要使用VueLoaderPlugin


        new HtmlWebpackPlugin({
            title:'test',
            filename:'index.html',
            template:path.join(__dirname,'../index.html'),
            inject:'body'
        }),

        new webpack.HotModuleReplacementPlugin()   // 不要在生产环境启用
        
    ],

    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    {
                        loader:'vue-loader', // 需要安装vue-template-compiler  依赖
                        options:{
                            loaders: {
                                css:'css-loader',
                                sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                          }
                        }
                    }
                   
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
}