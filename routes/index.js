var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var noteDao=require("../dao/noteDao");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{ errMsg: '' });
    //res.sendfile("./views/index.html");
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
    var email = req.body.email;
    var password = req.body.password.toString();
    console.log(email);
    console.log(password);
    var loginUser = new User({
        username : email,
        password: password
    });
    console.log(loginUser.password);

    //通过用户名取到用户信息
    loginUser.userInfo(function(err,result){
        if(err){
            //res.render('index', {errMsg: err });
            console.log('111111');
            res.sendfile("./views/index.html", {errMsg: err });
            return;
        }
        if(result == ''){
            console.log('2222222');
            res.sendfile("./views/index.html", {errMsg: 'the user not exist!'});
            //res.render('index', {errMsg: 'the user not exist!' });
            return;
        }
        else{
            //判断用户密码是否填写正确  演示没做加密，等有时间再加
            if(result[0]['password'] == password){
                console.log('OK');
                //var user = {'uname':username};
                //req.session.user = user;//保存用户session信息
                //res.sendfile("./views/note.html");
                res.redirect('/note');
                //登陆成功，进行页面的跳转
                console.log("登陆成功");

                // 设置session(保存用户信息)，然后前端通过<%=userinfo%>获取
                req.app.locals['userinfo'] = username;

                // 通过传递信息，然后判断，再跳转对应URL
                res.json({code:1,msg:req.app.locals['userinfo']});
               }
            else{
                console.log('333333');
                //res.render('index', {errMsg: 'Wrong password!' });
                res.sendfile("./views/index.html", {errMsg: 'Wrong password!'});
            }
        }
    });
});



module.exports = router;