//货物的逻辑
const {exec, escape} = require('../db/mysql');
const { v1: uuidv1 } = require('uuid');
const {recordList, recordAdd} = require('./record')
const goodsList = async (name)  => {
    let sql = `select * from goods where 1=1 `;
    if(name){
        sql += `and name like '%${name}%' `   //拼接搜索作者
    }
    sql += 'order by createtime DESC'
    let rows = await exec(sql);
    if(rows.length){
        for(let i = 0; i < rows.length; i++){
            let r_row = await recordList({id:rows[i].id})
            rows[i].records = r_row || []
        }
    }
    return rows || []
}
const goodsMod = async (obj) =>{
    let sql = `update goods set name='${obj.name}', identifier = '${obj.identifier}', quantity=${obj.quantity}, modifytime=${obj.modifytime}, modifyperson='${obj.modifyperson}', remark='${obj.remark}' where id='${obj.id}';`;
    let rows = await exec(sql);
    if(rows.changedRows > 0 && Math.abs(obj.changeNum) > 0){
        let operate = obj.changeNum < 0 ? 2 : 1;
        let num = Math.abs(obj.changeNum);
        let createtime = new Date().getTime();
        let r_rows = await recordAdd({id:uuidv1(), identifier:obj.identifier, name:obj.name, gId:obj.id, operate:operate, num:num, person:obj.person, createtime:createtime})
    }
    return rows || []
}
const goodsAdd = async (obj) => {
    let new_uuid = uuidv1();
    let sql = `insert into goods set id = '${new_uuid}', name='${obj.name}', identifier = '${obj.identifier}', quantity=${obj.quantity}, createtime=${obj.createtime}, modifytime=${obj.modifytime}, modifyperson='${obj.modifyperson}', remark='${obj.remark}';`;
    let rows = await exec(sql);
    if(rows.affectedRows > 0){
        let r_rows = await recordAdd({id:uuidv1(), identifier:obj.identifier, name:obj.name, gId:new_uuid, operate:2, num:obj.quantity, person:obj.modifyperson, createtime:obj.createtime})
    }
    return rows || []
}
const goodsDel = async (id) => {
    let sql = `delete from goods where id='${id}';`;
    let rows = await exec(sql);
    return rows || []
}
module.exports = {
    goodsList,
    goodsAdd,
    goodsMod,
    goodsDel,
}