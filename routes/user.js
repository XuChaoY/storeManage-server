const router = require('koa-router')();
const {login} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel")

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    let data = await login(username, password);
    if(data.username){
        //设置session
        ctx.session.username = data.username;
        let resData = {username:data.username, authority:data.authority}
        ctx.body = new SuccessModel(resData, "登录成功");
        return
    }
    ctx.body = new ErrorModel('登录失败')
})

router.get('/logout', async function(ctx, next){
    ctx.session.username = "";
    ctx.body = new SuccessModel("退出登录");
})

module.exports = router