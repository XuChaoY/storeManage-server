//统一返回数据格式
class BaseModel{   //类命名开头大写
    constructor(data, message){
        if(typeof data === 'string'){   //如果只传入message
            this.message = data;
            data = null;
            message = null;
        }
        if(data){
            this.data = data;
        }

        if(message){
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data, message){
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message){
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}