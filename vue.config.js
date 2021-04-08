
const path  = require('path'); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  publicPath : process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', resolve('./src'))
    .set('components', resolve('./src/components'))  //set第一个参数：设置的别名，第二个参数：设置的路径　
    .set('network', resolve('./src/network'))　
    .set('utils', resolve('./src/utils'))
    .set('views', resolve('./src/views'))
    .set('assets', resolve('./src/assets'))
  },
}
