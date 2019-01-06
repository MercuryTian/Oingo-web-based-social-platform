var filterSqlMap = {
    insert:'INSERT INTO Filter (sid, lid, tag, state, uid, shareFrom) VALUES (?, ?, ?, ?, ?, ?);',
    // update:'update note set title=?, content=? where id=?',
    delete: 'DELETE FROM Filter WHERE fid = ?',
    // queryById: 'select * from note where id=

    //queryAll: 'SET @hui = (SELECT uid FROM UserInfo WHERE uname = ?);SET @cur_latitude = ?;SET @cur_longtitude =?;SET @cur_state = (SELECT state FROM UserMoment WHERE uid = @hui);CREATE TEMPORARY TABLE t1 SELECT lid, sid, CONCAT('%', tag, '%') AS newtag, shareFrom FROM Filter NATURAL JOIN Location NATURAL JOIN Schedule WHERE (endTime >= ? AND startTime <= ?) OR (endTime = NULL AND startTime <= ?) OR (sid = NULL) AND @cur_state = ? AND (rptFlag = NULL OR rptFlag & 1 << 2) AND st_distance(Point(@cur_latitude, @cur_longtitude), Point(latitude, longtitude)) <= radius;'
        //+'SELECT DISTINCT nid, content FROM Note n, t1, Schedule s, Location l WHERE n.sid = s.sid AND n.lid = l.lid AND  st_distance(Point(@cur_latitude, @cur_longtitude), Point(latitude, longtitude)) <= radius AND  n.tags LIKE t1.newtag  AND (endTime >= ? AND startTime <= ?) OR (endTime = NULL AND startTime <= ?) OR (n.sid = NULL) AND (rptFlag = NULL OR rptFlag & 1 << 2)  AND (shareTo="public"  OR  (shareTo="friends"  AND @hui IN (SELECT fuid2 FROM Friend f WHERE f.fuid1= n.uid) OR @hui IN (SELECT fuid1 FROM Friend f WHERE f.fuid2= n.uid) OR n.uid = @hui) OR  (shareTo = "private" AND n.uid = @hui))  AND (shareFrom = "public"  OR  (shareFrom = "friends"  AND n.uid IN (SELECT fuid2 FROM Friend f WHERE f.fuid1 = @hui) OR n.uid IN (SELECT fuid1 FROM Friend f WHERE f.fuid2 = @hui) OR n.uid = @hui) OR  (shareFrom = "private" AND @hui = n.uid));'

    queryAll: 'SET @hui = (SELECT uid FROM UserInfo WHERE uname = ?);\
        SET @cur_latitude = ?;\
        SET @cur_longtitude = ?;\
        SET @cur_state = (SELECT state FROM UserMoment WHERE uid = @hui);\
        DROP TABLE IF EXISTS t1;\
        CREATE TEMPORARY TABLE t1 \
        SELECT lid, sid, CONCAT("%", tag, "%") AS newtag, shareFrom \
    FROM Filter NATURAL JOIN Location NATURAL JOIN Schedule \
    WHERE (endTime >= ? AND startTime <= ?) OR \
      (endTime = NULL AND startTime <= ?) OR \
      (sid = NULL) AND \
      @cur_state = ? AND \
      (rptFlag = NULL OR rptFlag & 1 << 2) AND \
      st_distance(Point(@cur_latitude, @cur_longtitude), Point(latitude, longtitude)) <= radius;\
        SELECT DISTINCT nid, content \
        FROM Note n, t1, Schedule s, Location l \
        WHERE n.sid = s.sid AND n.lid = l.lid AND st_distance(Point(@cur_latitude, @cur_longtitude), Point(latitude, longtitude)) <= radius AND n.tags LIKE t1.newtag \
        AND (endTime >= ? AND startTime <= ?) \
        OR (endTime = NULL AND startTime <= ?) \
        OR (n.sid = NULL) \
        AND (rptFlag = NULL OR rptFlag & 1 << 2) AND (shareTo="public" OR  (shareTo="friends" AND @hui IN (SELECT fuid2 FROM Friend f WHERE f.fuid1= n.uid) \
           OR @hui IN (SELECT fuid1 FROM Friend f WHERE f.fuid2= n.uid) \
           OR n.uid = @hui) \
       OR  (shareTo = "private" AND n.uid = @hui)) \
       AND (shareFrom = "public"  \
       OR  (shareFrom = "friends" \
           AND n.uid IN (SELECT fuid2 FROM Friend f WHERE f.fuid1 = @hui) \
           OR n.uid IN (SELECT fuid1 FROM Friend f WHERE f.fuid2 = @hui) \
           OR n.uid = @hui) \
       OR  (shareFrom = "private" AND @hui = n.uid))'


};

module.exports = filterSqlMap;