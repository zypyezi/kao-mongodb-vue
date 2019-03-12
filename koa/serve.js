const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const Monk = require('monk')  //中间件 monk

const router = new Router()
var db = new Monk('localhost:27017/zyp')  //连接到数据库
const documents = db.get('col2')  //表


/**
 * get请求获取参数
 *  ctx.query
 *  ctx.querystring
 *  ctx.request.query
 *  ctx.request.querystring
 */
router.get('/zyp/getList', async (ctx) => {
    let res = await documents.find()
    ctx.response.type = 'application/json'
    ctx.body = {code:0, data:res}
})

/**
 *  使用post请求获取参数 使用原生的方法较为繁琐
 *  可以使用中间件 koa-bodyparser
 */
router.post('/zyp/add', async (ctx) => {
    try {
      let str = ''
      ctx.req.on('data', (data) => {
          console.log(data)
          str += data
      })
      ctx.req.addListener('end', () => {
          console.log(str)
          documents.insert(JSON.parse(str))
      })
      
      ctx.response.type = 'application/json'
      ctx.body = {code :0, data : []}
  } catch (err) {
      reject(err)
  }
   
})

router.get('/zyp/clear', async (ctx) => {
 await documents.remove()
 ctx.response.type = 'application/json'
 ctx.body = {code :0, data : []}
})



app.use(router.routes())

app.listen(3000, () => {
  console.log('运行中。。。')
})



// midleware
// const serve = require('koa-static')

// app.use(serve('../index.html'))

// var server = app.listen(3000, function () {
//     const host = server.address().address
//     const port = server.address().port
//     // console.log('test...', host, port)
// })







// // https://koa.bootcss.com/
// // 支持 node > 7 ; es6 和async语法
// // 兼容旧版本，使用babel
// //

// /**
//  *  使用级联方式
//  *  await next()  待下一个中间件执行完后，再继续执行当前中间件接下去的代码
//  */

// /**
//  *  核心代码
//  */

//  const Koa = require('koa');
//  const app = new Koa();
//  const fs = require('fs');

//  /**
//   *  response 默认返回的类型是text/plain, 设置返回类型， ctx.response.type ; ctx.response.accepts
//   *  fs.createReadStream('./demos/template.html')  可利用fs读取html模版文件
//   *  ctx.request.path  获取访问路径 ； 可以使用koa-route
//   *   ctx.response.redirect()  重定向
//   *   静态资源  koa-static
//   */
//  app.use(async ctx => {
  //  ctx.response.body = 'Hello World'
  //  ctx.body = 'Hello World';  //简写

//  });
 
//  app.listen(3000);

// console.log('app started at port 3000...');


// /**
//  *  app.listen
//  *  const http = require('http');
//  *  const Koa = require('koa');
//  *  const app = new Koa();
//  *  http.createServer(app.callback()).listen(3000);
//  * 可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址
//  */

//  /**
//   *  app.callback
//   */


//   /**
//    * app.use
//    *  加载中间件
//    *  中间件 采用栈的方式
//    *  异步操作需要使用 async await
//    */


//   /**
//   * app.context
//   *   ctx 的原型
//   *   通过编辑app.context 为ctx添加属性
//   *  ctx 上的许多属性都是使用 getter ，setter 和 Object.defineProperty() 定义的
//   *  koa-compose 可以合成中间件
//   */

app.on('error', (err, ctx) => {
  ctx.throw(500)
})
// /**
//  *  错误处理
//  *  app.on('error', (err, ctx) => {
//  *      ctx.throw(500)
//  * })
//  * 使用try catch 捕获错误时， 不会触发error事件，需要调用ctx.app.emit()
//  */


//  /**
//   * ctx.cookies
//   */