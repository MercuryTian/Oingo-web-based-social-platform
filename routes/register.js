var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile("./views/register.html");
});


router.post('/',function(req, res) {
    /*var username = req.body.uname;
    var password = req.body.pwd;
    var email=req.body.email;
    console.log(password);
    var newUser = new User({
        password: password,
        username : username,
        email : email
    });*/
    //获取form表单提交的登录数据
    var email = req.body.email;
    var username = req.body.uname;
    var pwd = req.body.pwd;
    console.log(email, username, pwd);

    var newUser = new User({
        username : username,
        password: pwd,
        email: email
    });
    newUser.password=pwd.toString();
    console.log(newUser.username,newUser.email,newUser.password);
    //检查用户名是否已经存在
    newUser.userNum(email, function (err, results) {
        if (results != null && results[0]['num'] > 0) {
            console.log('used');
            err = 'The email has been used!';
        }

        if (err) {
            console.log('111');
            res.sendfile("./views/register.html", {errMsg: err });
            //res.render('register', {errMsg: err });
            return;
        }
        newUser.userSave(username,email,pwd,function(err,result){
            if(err){
                console.log('222');
                //res.render('register', {errMsg: err }
                res.sendfile("./views/register.html", {errMsg: err });
                return;
            }
            if(result.insertId > 0){
                console.log('ok');
                res.locals.status = "success";
                //res.render('register', {errMsg:'' });
                //res.sendfile("./views/note.html");
                res.redirect('/note');
            }
            else{
                console.log('333');
                res.sendfile("./views/register.html", {errMsg: err });
                //res.render('register', {errMsg: err });
            }
        });
    });
});

module.exports = router;

