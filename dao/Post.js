// 实现与MySQL交互
var mysql = require('mysql');
//var $conf = require('../conf/db');
var $sql = require('./noteSqlMap');
var mysqlConf=require("./mysqlConf")

var pool = mysql.createPool(mysqlConf.mysql);
console.log('OK');

function Post(username, tags, content, time) {
    this.user = username;
    this.tags= tags;
    this.content = content;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
}

//增
Post.prototype.save = function (callback) {
    var post = {
        user: this.user,
        title:this.title,
        post: this.post,
        time: this.time
    };
    var query = mysql.query('INSERT INTO posts SET ?', post, function(err, result) {
        if(err){
            callback(err);
        }
        callback(err, result);
    });
};

//几个路由共用，所以为静态方法
//查
Post.prototype.get = function (callback) {

    pool.getConnection(function(err,connection){
        connection.query($sql.queryAll,function(err, rows, fields){
            if (err) {
                callback(err);
            }
            rows = rows || [];
            rows.forEach(function (row, index) {
                var now = row.postTime;
                row.postTime = now.getFullYear() + "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate();
            });
            rows.reverse();//倒序排列
            console.log("11111");
            callback(null, rows);
        });
    });


};

//删
Post.remove = function(query, callback) {
    var sql = 'DELETE FROM  `posts` WHERE ' + query;
    mysql.query(sql, function(err, result){
        if(err) {
            callback(err);
        }
        callback(err, result);
    });
};

//改
Post.update = function (options, callback) {
    var sql = 'UPDATE posts SET title = "'+ options.title + '",' +
        'post = "' + options.post + '"' +
        'WHERE id = ' + options.id;
    mysql.query(sql, options, function(err, result) {
        if(err) {
            callback(err);
        }
        callback(err, result);
    });
};

module.exports = Post;