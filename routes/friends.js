var express = require('express');
var router = express.Router();
var noteDao=require("../dao/noteDao")

// new
router.get('/', function(req, res, next) {
    //res.render('newnote');
    res.sendfile("./views/friends.html");
});

// create
router.post('/', function(req, res, next) {
    noteDao.add(req, res, next);
    res.redirect("/friends");
});

module.exports = router;