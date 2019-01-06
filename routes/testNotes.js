var express = require('express');
var router = express.Router();

var mysql = require('mysql');
//var $conf = require('../conf/db');
var $sql = require('../dao/filterSqlMap');
var mysqlConf=require("../dao/mysqlConf")
var Note = require("../models/notes");

var pool = mysql.createPool(mysqlConf.mysql);
console.log('OK');

/* GET map page. */
router.get('/', function(req, res, next) {
    //res.render('index',{ errMsg: '' });
    console.log(req.query)
    let positionX = req.query.positionX;
    let positionY = req.query.positionY;
    let uname = req.query.uname;
    let time = req.query.time;
    let state = req.query.state;


    //
    notes = [
        {
            title : "HAHA",
            content : "XIXI",
            position :  {lat: 40.7675, lng: -73.8331}
        },
        {
            title : "DUDU",
            content : "GAGAXI",
            position : {lat: 40.7675, lng: -73.8331}
        }
    ]

    //res.status(200).json(notes)
    console.log(time,state);


    function heredoc(fn) {
        return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
    }
    var sql1 = heredoc(function(){
        /*
         SET @hui = (SELECT uid FROM UserInfo WHERE uname = ?);
         WITH t1 AS(
         SELECT lid, sid, CONCAT("%", tag, "%") AS newtag, shareFrom
         FROM Filter NATURAL JOIN Location NATURAL JOIN Schedule
         WHERE (endTime >= ? AND startTime <= ?) OR
         (endTime = NULL AND startTime <= ?) OR
         (sid = NULL) AND
         (rptFlag = NULL OR rptFlag & 1 << 2) AND
         st_distance(Point(?, ?, Point(latitude, longtitude)) <= radius)
         SELECT *
         FROM Note n, t1, Schedule s, Location l
         WHERE n.sid = s.sid AND n.lid = l.lid AND st_distance(Point(?, ?), Point(latitude, longtitude)) <= radius AND n.tags LIKE t1.newtag
         AND (endTime >= ? AND startTime <= ?)
         OR (endTime = NULL AND startTime <= ?)
         OR (n.sid = NULL)
         AND (rptFlag = NULL OR rptFlag & 1 << 2) AND (shareTo="public" OR  (shareTo="friends" AND @hui IN (SELECT fuid2 FROM Friend f WHERE f.fuid1= n.uid)
         OR @hui IN (SELECT fuid1 FROM Friend f WHERE f.fuid2= n.uid)
         OR n.uid = @hui)
         OR  (shareTo = "private" AND n.uid = @hui))
         AND (shareFrom = "public"
         OR  (shareFrom = "friends"
         AND n.uid IN (SELECT fuid2 FROM Friend f WHERE f.fuid1 = @hui)
         OR n.uid IN (SELECT fuid1 FROM Friend f WHERE f.fuid2 = @hui)
         OR n.uid = @hui)
         OR  (shareFrom = "private" AND @hui = n.uid))'
         */
    });

    var sql2 = heredoc(function(){
        /*
         select uname,content, lname, latitude, longtitude, startTime, endtime, rptFlag, postTime, tags, shareTo, cmtFlag from note natural join userinfo natural join location natural join schedule
         */
    });

    var s='SELECT * FROM Note n, Filter f, Schedule s1, Location l1, Schedule s2, Location l2 \
    WHERE n.sid = s1.sid AND n.lid = l1.lid AND f.sid = s2.sid AND f.lid = l2.lid\
    AND st_distance(Point(?, ?), Point(l1.latitude, l1.longtitude)) <= l1.radius\
    AND (s1.endTime >= ? AND s1.startTime <= ?)\
    OR (s1.endTime = NULL AND s1.startTime <= ?)\
    OR (n.sid = NULL)\
    AND (s1.rptFlag = NULL OR s1.rptFlag & 1 << 2)\
    AND (s2.endTime >= ? AND s2.startTime <= ?)\
    OR (s2.endTime = NULL AND s2.startTime <= ?) OR\
    (s2.sid = NULL) AND\
    (s2.rptFlag = NULL OR s2.rptFlag & 1 << 2) AND\
    st_distance(Point(?, ?), Point(l2.latitude, l2.longtitude)) <= l2.radius'




    pool.getConnection(function (err, connection) {
        console.log("222");

        connection.query(s,[positionX,positionY,time,time,time,time,time,time,positionX,positionY,] , function(err, result) {
            //jsonWrite(res, result);
            //console.log("1 "+result);

            if(err)
            {
                console.log("Error :" + err.message);

            }
            else
            {
                console.log("1111111111111111111"+result[0]);
                //callback(err, result);
            }

            //return result;
            //res.render('map', {posts: result});


            var markers = {
                content: "111",
                lat: "40.7675",
                lng: "-73.8331"
                //markers.uname=item.uname;
                //markers.tags=item.tags;
            };
            var notes=[];


            console.log(result.length);
            for(var i=0;i<result.length;i++){
                console.log(result[i]);
                //markers['content']=result[i].content;
                //markers['lat']=result[i].latitude;
                //markers['lng']=result[i].longtitude;
                var markers = {
                    title : result[i].tags,
                    content: result[i].content,
                    position : {lat: result[i].latitude, lng: result[i].longtitude}
                    //markers.uname=item.uname;
                    //markers.tags=item.tags;
                };
                notes.push(markers);
            }
            connection.release();
            res.status(200).json(notes)
            //console.log(notes);

            //res.render('map', {posts: result, notes:notes});

        });

        //res.render('map', {posts: note});
        //res.sendfile("./views/map.html");
    });

});

module.exports = router;