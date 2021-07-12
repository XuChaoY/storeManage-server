//货物的逻辑
const {exec, escape} = require('../db/mysql');
const { v1: uuidv1 } = require('uuid');
const recordList = async ({id}) => {
    let sql = `select * from goods_record where gId='${id}' `;
    sql += 'order by createtime DESC'
    let rows = await exec(sql);
    return rows || []
}

const recordAdd = async (obj) => {
    let sql = `insert into goods_record set id = '${uuidv1()}', identifier='${obj.identifier}', gName='${obj.name}', gId = '${obj.gId}', operate = '${obj.operate}', num=${obj.num}, createtime=${obj.createtime}, person='${obj.person}';`;
    let rows = await exec(sql);
    return rows || []
}

module.exports = {
    recordList,
    recordAdd,
}