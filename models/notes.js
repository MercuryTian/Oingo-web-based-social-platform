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


function Note(note){
    this.content = note.content;
    this.lat = note.lat;
    this.lng=note.lng;
    this.radius=note.radius;
    this.postTime=note.postTime;
    this.tags=note.tags;
    this.shareTo=note.shareTo;
    this.placename=note.placename;
}

function noteAll(note,callback){
    var SELECT_ALLNOTE ="SELECT * FROM NOTE natural join location natural join schedule;"
    pool.getConnection(function(err,connection){
        connection.query(SELECT_ALLNOTE,function(err,result){
            if (err) {
                console.log("SELECT_LOGIN Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
}


function getNote(callback) {
    /*var note = {
        context : this.context,
        lat : this.lat,
        lng: this.lng,
        postTime : this.postTime,
        tags: this.tags,
        shareTo : this.shareTo,
        placename:this.placename
    };*/
    var note= new Note();
    noteAll('note', function (err, result) {

        if(err || !result.length) return callback('error or no results');
        // since result is array of objects [{word: 'someword'},{word: 'someword2'}] let's remap it
        if(result){
            var note = new Note({
                content : result.content,
                lat : result.lat,
                lng: result.lng,
                radius:result.radius,
                postTime : result.postTime,
                tags: result.tags,
                shareTo : result.shareTo,
                placename:result.lname
            });
            console(note);
        }
        //result = result.map(obj =>obj.word);
        // result should now look like ['someword','someword2']
        // return it
        callback(null, result);

    });
}

//init the google map
function initMap() {
    var uluru = {lat: 40.7675, lng: -73.8331};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });


}

//add marker to the map
function addMarker(pos, t, map) {
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';


    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Note'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    return marker;
}


module.exports = Note;