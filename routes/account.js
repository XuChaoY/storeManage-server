const router = require('koa-router')()
const {accoutsList, accountsAdd, accountsMod, accountsDel} = require('../controller/account');
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel")

router.prefix('/api/account');

router.post('/list', async (ctx, next) => {
    const param = ctx.request.body
    let data = await accoutsList(param);
    ctx.body = new SuccessModel(data);
})
router.post('/add', async (ctx, next) => {
    if(!ctx.session || !ctx.session.username){
        ctx.body = new ErrorModel("未登录");
    }
    const param = ctx.request.body;
    param['amount'] = Number(param.amount)
    param['createtime'] = new Date().getTime();
    let data = await accountsAdd(param);
    if(data.affectedRows > 0){
        ctx.body = new SuccessModel("新增成功");
    }else{
        ctx.body = new ErrorModel("新增失败");
    }
})
router.post('/mod', async (ctx, next) => {
    if(!ctx.session || !ctx.session.username){
        ctx.body = new ErrorModel("未登录");
    }
    const param = ctx.request.body;
    param.modifytime = new Date().getTime();
    let data = await accountsMod(param);
    if(data.affectedRows > 0){
        ctx.body = new SuccessModel("修改成功");
    }else{
        ctx.body = new ErrorModel("修改失败");
    }
})
router.post('/del', async (ctx, next) => {
    if(!ctx.session || !ctx.session.username){
        ctx.body = new ErrorModel("未登录");
    }
    const {id} = ctx.request.body;
    let data = await accountsDel(id);
    if(data.affectedRows > 0){
        ctx.body = new SuccessModel("删除成功");
    }else{
        ctx.body = new ErrorModel("删除失败");
    }
})
module.exports = router