module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'cong',
        database:'Oingo',
        // 最大连接数，默认为10
        socketPath:'/tmp/mysql.sock',
        connectionLimit: 10
    }
};