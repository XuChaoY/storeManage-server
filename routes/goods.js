//货物接口

const router = require('koa-router')()
const {goodsList, goodsAdd, goodsMod, goodsDel} = require('../controller/goods');
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModel")

router.prefix('/api/goods');
router.post('/list', async (ctx, next) => {
    const {name} = ctx.request.body
    let data = await goodsList(name);
    ctx.body = new SuccessModel(data);
})

router.post('/add', async (ctx, next) => {
    if(!ctx.session || !ctx.session.username){
        ctx.body = new ErrorModel("未登录");
    }
    const param = ctx.request.body;
    param['quantity'] = Number(param.quantity)
    param['createtime'] = new Date().getTime();
    param['modifytime'] = new Date().getTime();
    param['modifyperson'] = ctx.session.username;
    let data = await goodsAdd(param);
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
    const goodItem = ctx.request.body;
    goodItem.modifytime = new Date().getTime();
    goodItem.person = ctx.session.username;
    let data = await goodsMod(goodItem);
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
    let data = await goodsDel(id);
    if(data.affectedRows > 0){
        ctx.body = new SuccessModel("删除成功");
    }else{
        ctx.body = new ErrorModel("删除失败");
    }
})
module.exports = router