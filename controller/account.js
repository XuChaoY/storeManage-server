const {exec, escape} = require('../db/mysql');
const { v1: uuidv1 } = require('uuid');

const accoutsList = async (param)=> {
    let sql = `select * from account_book where 1=1 `;
    if(param.start && param.end){
        sql += `and createtime > ${param.start} and createtime < ${param.end}`   //拼接搜索作者
    }
    sql += ' order by createtime DESC'
    let rows = await exec(sql);
    return rows || []
}

const accountsMod = async (obj) =>{
    let sql = `update account_book set amount='${obj.amount}', type='${obj.type}', payer='${obj.payer}', modifytime='${obj.modifytime}', payee='${obj.payee}', purpose='${obj.purpose}', tel='${obj.tel}', remark='${obj.remark}' where id='${obj.id}';`;
    let rows = await exec(sql);
    return rows || []
}
const accountsAdd = async (obj) => {
    let new_uuid = uuidv1();
    let sql = `insert into account_book set id = '${new_uuid}', amount='${obj.amount}', type='${obj.type}', payer='${obj.payer}', payee='${obj.payee}', purpose='${obj.purpose}', tel='${obj.tel}', createtime=${obj.createtime}, modifytime=${obj.createtime}, remark='${obj.remark}';`;
    let rows = await exec(sql);
    return rows || []
}
const accountsDel = async (id) => {
    let sql = `delete from account_book where id='${id}';`;
    let rows = await exec(sql);
    return rows || []
}
module.exports = {
    accoutsList,
    accountsMod,
    accountsAdd,
    accountsDel
}