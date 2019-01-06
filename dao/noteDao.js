// 实现与MySQL交互
var mysql = require('mysql');
//var $conf = require('../conf/db');
var $sql = require('./noteSqlMap');
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
            // 'INSERT INTO post(id, title, content) VALUES(0,?,?)',
            connection.query($sql.insert, [req.body.tags, req.body.content], function(err, result) {
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
            connection.query($sql.queryAll, function(err, result) {
                //jsonWrite(res, result);
                console.log(result[0]);
                connection.release();
                return result;
            });
        });
    }

};
