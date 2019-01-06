var express = require('express');
var router = express.Router();
var noteDao=require("../dao/noteDao")


// 实现与MySQL交互
var mysql = require('mysql');
//var $conf = require('../conf/db');
var $sql = require('../dao/noteSqlMap');
var mysqlConf=require("../dao/mysqlConf")
var Note = require("../models/notes");

var pool = mysql.createPool(mysqlConf.mysql);
console.log('OK');

/* GET note page. */
router.get('/', function(req, res, next) {
    var note=noteDao.queryAll(req, res, next);
    console.log(note);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                //jsonWrite(res, result);
                console.log(result[0]);
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


                for(var i=0;i<result.length;i++){
                    console.log(result[i]);
                    //markers['content']=result[i].content;
                    //markers['lat']=result[i].latitude;
                    //markers['lng']=result[i].longtitude;
                    var markers = {
                        content: result[i].content,
                        lat: result[i].latitude,
                        lng: result[i].longtitude
                        //markers.uname=item.uname;
                        //markers.tags=item.tags;
                    };
                    notes.push(markers);
                }
                connection.release();
                //res.status(200).json(notes)
                console.log(notes);

                res.render('note', {posts: result});
                // res.sendfile("./views/note.html");
                //

            });

            //res.render('map', {posts: note});
            //res.sendfile("./views/map.html");
        });
    //res.sendfile("./views/note.html");
    res.render("note");
    //res.json({data:note})

});


/*var geohash = require("geohash").GeoHash;

// route routing is very easy with express, this will handle the request for root directory contents.
// :id is used here to pattern match with the first value after the forward slash.
app.get("/:id",function (req,res)
{
    //decode the geohash with geohash module
    var latlon = geohash.decodeGeoHash(req.params["id"]);
    console.log("latlon : " + latlon);
    var lat = latlon.latitude[2];
    console.log("lat : " + lat);
    var lon = latlon.longitude[2];
    console.log("lon : " + lon);
    zoom = req.params["id"].length + 2;
    console.log("zoom : " + zoom);
    // now we use the templating capabilities of express and call our template to render the view, and pass a few parameters to it
    res.render("index.ejs", { layout: false, lat:lat, lon:lon, zoom:zoom, geohash:req.params["id"]});

});
*/


module.exports = router;