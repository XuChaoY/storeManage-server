const router = require('koa-router')()

router.get('/api/demo', async (ctx, next) => {
  ctx.body = {
    msg:"hello world"
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
