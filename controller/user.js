//用户登录的逻辑
const {exec, escape} = require('../db/mysql')
const login = async (username, password) => {
    username = escape(username);   //防止sql注入   
    password = escape(password);
    let sql = `select username, authority from user where username=${username} and password=${password}`;
    let rows = await exec(sql);
    return rows[0] || {}
}

module.exports = {
    login
}