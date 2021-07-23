//数据库连接配置、redis连接配置，根据当前环境变量的不同配置参数不同
const env = process.env.NODE_ENV;     //获取全局环境变量 (process node内置全局变量)

//配置变量
let MYSQL_CONF;  //数据库连接配置变量

if(env == 'dev'){  //开发环境
    //mysql
    MYSQL_CONF = {
        host:"localhost", //域名
        user:"root", //数据库的用户
        password:"123456", //数据库密码
        port:"3306", //数据库端口号 默认3306
        database:"store", // 数据库名称
    };
}

if(env == 'production'){  //线上环境   目前保持和dev环境一样，到上线的时候再根据情况跟换
    //mysql
    MYSQL_CONF = {
        host:"172.22.23.97", //域名
        user:"root", //数据库的用户
        password:"x", //数据库密码
        port:"3306", //数据库端口号 默认3306
        database:"store", // 数据库名称
    };
}

module.exports={   //导出变量
    MYSQL_CONF,
}