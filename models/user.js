var mysql = require('mysql');

//创建连接池 createPool(Object)
// Object和createConnection参数相同。
var pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password :'cong',
    database:'Oingo',
    socketPath:'/tmp/mysql.sock'
});
//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
    console.log("pool on");
    connection.query('SET SESSION auto_increment_increment=1')
});

function User(user){
    this.username = user.username;
    this.passward = user.passward;
    this.email=user.email;
}

User.prototype.userSave = function(username,email,passward,callback){
    var user = {
        username : this.username,
        email : this.email,
        passward : this.passward
    };
    var INSERT_USER= "INSERT INTO USERINFO (UNAME,EMAIL,PASSWORD) VALUES (?,?,?)";
    pool.getConnection(function(err,connection){
        connection.query(INSERT_USER,[username,email,passward],function(err,result){
            if(err){
                console.log("INSERT_USER Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
};


//根据用户名得到用户数量
User.prototype.userNum = function(username, callback) {
    pool.getConnection(function(err,connection){
        console.log("getConnection");
        console.log("getUserNumByName");
        var SELECT_NUM = "SELECT COUNT(1) AS num FROM USERINFO WHERE EMAIL = ?";
        connection.query(SELECT_NUM, [username], function (err, result) {
            if (err) {
                console.log("SELECT_NUM Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
};

User.prototype.userInfo = function(callback){
    var user = {
        username : this.username,
        passward : this.passward
    };
    var SELECT_LOGIN ="SELECT * FROM USERINFO WHERE EMAIL = ?";
    pool.getConnection(function(err,connection){
        connection.query(SELECT_LOGIN,[user.username],function(err,result){
            if (err) {
                console.log("SELECT_LOGIN Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
}
module.exports = User;