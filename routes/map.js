var express = require('express');
var router = express.Router();
var noteDao=require("../dao/noteDao");
// 实现与MySQL交互
var mysql = require('mysql');
//var $conf = require('../conf/db');
var $filtersql=require('../dao/filterSqlMap');
var $sql = require('../dao/noteSqlMap');
var mysqlConf=require("../dao/mysqlConf")
var Note = require("../models/notes");


/* GET map page. */
router.get('/', function(req, res, next) {

    res.render('map');
    //console.log($sql.queryAll);
    //console.log(req.body.uname, req.body.positionY, req.body.positionX);
    //
    // //var query='SELECT DISTINCT nid, content FROM Note n, t1, Schedule s, Location l WHERE n.sid = s.sid AND n.lid = l.lid AND  st_distance(Point(@cur_latitude, @cur_longtitude), Point(latitude, longtitude)) <= radius AND  n.tags LIKE t1.newtag  AND (endTime >= ? AND startTime <= ?) OR (endTime = NULL AND startTime <= ?) OR (n.sid = NULL) AND (rptFlag = NULL OR rptFlag & 1 << 2)  AND (shareTo="public"  OR  (shareTo="friends"  AND @hui IN (SELECT fuid2 FROM Friend f WHERE f.fuid1= n.uid) OR @hui IN (SELECT fuid1 FROM Friend f WHERE f.fuid2= n.uid) OR n.uid = @hui) OR  (shareTo = "private" AND n.uid = @hui))  AND (shareFrom = "public"  OR  (shareFrom = "friends"  AND n.uid IN (SELECT fuid2 FROM Friend f WHERE f.fuid1 = @hui) OR n.uid IN (SELECT fuid1 FROM Friend f WHERE f.fuid2 = @hui) OR n.uid = @hui) OR  (shareFrom = "private" AND @hui = n.uid));'
    // pool.getConnection(function (err, connection) {
    //
    //     connection.query($sql.queryAll, function(err, result) {
    //         //jsonWrite(res, result);
    //         //return result;
    //         //res.render('map', {posts: result});
    //
    //
    //         var markers = {
    //             content: "111",
    //             lat: "40.7675",
    //             lng: "-73.8331"
    //             //markers.uname=item.uname;
    //             //markers.tags=item.tags;
    //         };
    //         var notes=[];
    //
    //
    //         for(var i=0;i<result.length;i++){
    //             //console.log(result[i]);
    //             //markers['content']=result[i].content;
    //             //markers['lat']=result[i].latitude;
    //             //markers['lng']=result[i].longtitude;
    //             var markers = {
    //                 content: result[i].content,
    //                 lat: result[i].latitude,
    //                 lng: result[i].longtitude
    //                 //markers.uname=item.uname;
    //                 //markers.tags=item.tags;
    //             };
    //             notes.push(markers);
    //         }
    //         connection.release();
    //         //res.status(200).json(notes)
    //         //console.log(notes);
    //
    //         res.render('map', {posts: result});
    //
    //     });
    //
    //     res.render('map', {posts: note});
    //     //res.sendfile("./views/map.html");
    // });

});



// router.post('/filter', function(req, res, next) {
//     pool.getConnection(function (err, connection) {
//         connection.query($filtersql.queryAll, function (err, result) {
//             //jsonWrite(res, result);
//             console.log(result[0]);
//             //return result;
//             //res.render('map', {posts: result});
//
//
//             var markers = {
//                 content: "111",
//                 lat: "40.7675",
//                 lng: "-73.8331"
//                 //markers.uname=item.uname;
//                 //markers.tags=item.tags;
//             };
//             var notes=[];
//
//
//             for(var i=0;i<result.length;i++){
//                 console.log(result[i]);
//                 //markers['content']=result[i].content;
//                 //markers['lat']=result[i].latitude;
//                 //markers['lng']=result[i].longtitude;
//                 var markers = {
//                     content: result[i].content,
//                     lat: result[i].latitude,
//                     lng: result[i].longtitude
//                     //markers.uname=item.uname;
//                     //markers.tags=item.tags;
//                 };
//                 notes.push(markers);
//             }
//             connection.release();
//             //res.status(200).json(notes)
//             console.log(notes);
//
//             res.render('map', {posts: result, notes:notes});
//
//         });
//
//         //res.render('map', {posts: note});
//         //res.sendfile("./views/map.html");
//     });
// });


module.exports = router;