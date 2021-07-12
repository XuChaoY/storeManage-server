//连接数据库，本项目使用的是mysql，如果你用的时候其他的，在做调整

const mysql = require('mysql')  //引入mysql数据库工具包
const {MYSQL_CONF} = require('../conf/db')   //导入MYSQL_CONF配置变量

const con = mysql.createConnection(MYSQL_CONF)   //创建数据库连接对象，并传入参数

con.connect();  //执行连接方法

//执行sql语句
function exec(sql){
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(result)
        })
    })

    return promise;  //返回一个promise对象
}

module.exports = {
    exec,
    escape:mysql.escape   //防注入攻击，就是存入数据库的数据中有代码
}