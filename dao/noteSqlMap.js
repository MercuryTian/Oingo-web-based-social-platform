var noteSqlMap = {
    insert:'INSERT INTO note(tags, content) VALUES(?,?)',
    update:'update note set title=?, content=? where id=?',
    delete: 'delete from note where id=?',
    queryById: 'select * from note where id=?',
    queryAll: 'select uname,content, lname, latitude, longtitude, startTime, endtime, rptFlag, postTime, tags, shareTo, cmtFlag from note natural join userinfo natural join location natural join schedule'

};

module.exports = noteSqlMap;

