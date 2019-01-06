var express = require('express');
var router = express.Router();

/* Post a note by a user */
router.post('/', function(req, res, next) {
  if (req.body.content === undefined) content = 'NULL';
  else content = req.body.content;
  if (req.body.tags === undefined) tags = 'NULL';
  else tags = req.body.tags;
  note_q = 'INSERT INTO Note (uid, sid, lid, content, postTime, tags, shareTo, cmtFlag) VALUES ( ' + 
  req.body.uid + ', ' + req.body.sid + ', ' + req.body.lid + ', ' + content + ', ' + req.body.postTime + ', ' + tags + ', ' + req.body.shareTo + ', ' + req.body.cmtFlag + ');'
  global.connections.query(note_q, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json(results)
  });
});

module.exports = router;
