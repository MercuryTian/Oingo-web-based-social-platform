// 实现与MySQL交互
var mysql = require('mysql');
//var $conf = require('../conf/db');
var $sql = require('./filterSqlMap');
var mysqlConf=require("./mysqlConf")

var pool = mysql.createPool(mysqlConf.mysql);
console.log('OK');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (response, ret) {
    if(typeof ret === 'undefined') {
        response.json({
            code:'1',
            msg: 'failed'
        });
    } else {
        response.json=(ret);
    }
};


var createResult = function(success, data) {
    var result = {};
    result.success = success;
    result.data = data;
    return result;
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            console.log(req.body);
            var param = req.query || req.params
            // 建立连接，向表中插入值
            // INSERT INTO Filter (sid, lid, tag, state, uid, shareFrom) VALUES (?, ?, ?, ?, ?, ?);
            connection.query($sql.insert, [req.body.sid, req.body.lid, req.body.tag, req.body.state, req.body.uid, req.body.shareFrom], function(err, result) {
                if(result) {
                    console.log('OK');
                    result = {
                        code: 200,
                        msg:'Success'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },

    // index
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // Given a uname[可NULL] and her current location[可NULL], currenttime[可NULL], and currentstate[可NULL], to see given the filters she has set up.
            console.log(req);
            connection.query($sql.queryAll, [req.body.uname, req.body.positionY, req.body.positionX, req.body.time, req.body.time, req.body.time, req.body.state, req.body.time, req.body.time, req.body.time], function(err, result) {
                //jsonWrite(res, result);
                console.log(result[0]);
                connection.release();
                return result;
            });
        });
    }

    // delete: function (req, res, next){
    //     pool.getConnection(function(err, connection){
    //         connection.query($sql.delete, [req.body.fid], function(err, result){
    //             if()

    //             connection.release();
    //         });
    //     });
    // }

};
