var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlda-angular'
});

db.connect( err => {
    if(err) throw err;
    console.log('đã kết nối db thành công');
})

module.exports = db;