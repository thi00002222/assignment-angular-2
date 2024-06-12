const db = require('./database')
const exp = require("express");
var bodyParser = require('body-parser')
const app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
var cors = require('cors');
app.use(exp.json());
app.use(cors());
app.get('/', (req, res) => {
    res.json("{'message':'API NodeJS Assigment'}")
});

app.get('/du_an', function (req, res, next) {
    let sql = `SELECT * FROM du_an order by id asc`;
    db.query(sql, function (err, result) {
        if (err) res.json({ 'message': err });
        else res.json(result)
    })
})

app.post('/du_an', function (req, res) {
    let {ten_da,start,tien,leader,member}=req.body;
    let sql = `INSERT INTO du_an set ten_da=?, start=?, tien=?, leader=?, member=?`;
    db.query(sql,[ten_da,start,tien,leader,member.join(',')],(err,d)=>{
        if(err) res.json({'thông báo:':err})
            else {res.json({'thông báo:':'chèn thành công'})};    
    })
})

app.put('/du_an/:id', function (req, res) {
    let data = req.body
    let id = req.params.id;
    if (isNaN(id) == true) {
        res.json({ 'thongbao': id + ' không tồn tại' })
        return;
    }
    let {ten_da,start,tien,leader,member}=req.body;
    let sql = `update du_an set ten_da=?, start=?, tien=?, leader=?, member=? where id=?`;
    db.query(sql, [ten_da,start,tien,leader,member.join(','), id], function (err, data) {
        if (err) res.json({ 'thongbao': `lỗi ${err}` });
        else res.json({ 'thongbao': 'đã sửa' })
    });
});

app.delete('/du_an/:id', function (req, res) {
    let id = req.params.id;
    let sql=`delete from du_an where id=?`;
    db.query(sql,   id,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã xóa'})
});
});

app.get('/du_an/:id', function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json('dự án không tồn tại');

    let sql = `SELECT * FROM du_an where id=${id} order by start desc`;
    db.query(sql, id, function (err, result) {
        if (err) res.json({ 'message': err });
        else if (result.length == 0) res.json({ 'message': 'dự án không có' })
        else res.json(result[0])
    })
})

app.get('/nhan_vien', function (req, res, next) {
    let sql = `SELECT * FROM nhan_vien`;
    db.query(sql, function (err, result) {
        if (err) res.json({ 'message': err });
        else res.json(result)
    })
})

app.post('/nhan_vien',function(req,res,next){
    let tt=req.body;
    let sql=`insert into nhan_vien set?`;
    db.query(sql,tt,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã thêm'}
        );
})
});

app.put('/nhan_vien/:id',function(req,res,next){
    let tt=req.body;
    let id=req.params.id;
    if (isNaN(id) == true) {
        res.json({ 'thongbao': id + ' không tồn tại' })
        return;
    }
    let sql = `update nhan_vien set? where id=?`;
    db.query(sql, [tt, id], function (err, data) {
        if (err) res.json({ 'thongbao': `lỗi ${err}` });
        else res.json({ 'thongbao': 'đã sửa' })
    });
})

app.delete('/nhan_vien/:id',function(req,res,next){
    let id = req.params.id;
    let sql=`delete from nhan_vien where id=?`;
    db.query(sql,   id,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã xóa'})
});

})

app.get('/nhan_vien/:id', function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json('nhân viên không tồn tại');

    let sql = `SELECT * FROM nhan_vien where id=${id}`;
    db.query(sql, id, function (err, result) {
        if (err) res.json({ 'message': err });
        else if (result.length == 0) res.json({ 'message': 'không có nhân viên này' })
        else res.json(result[0])
    })
})

app.get('/task', function (req, res, next) {
    let sql = `SELECT * FROM task`;
    db.query(sql, function (err, result) {
        if (err) res.json({ 'message': err });
        else res.json(result)
    })
})

app.post('/task',function(req,res,next){
    let tt=req.body;
    let sql=`insert into task set?`;
    db.query(sql,tt,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã thêm'}
        );
})
});

app.put('/task/:id',function(req,res,next){
    let tt=req.body;
    let id=req.params.id;
    if (isNaN(id) == true) {
        res.json({ 'thongbao': id + ' không tồn tại' })
        return;
    }
    let sql = `update task set? where id=?`;
    db.query(sql, [tt, id], function (err, data) {
        if (err) res.json({ 'thongbao': `lỗi ${err}` });
        else res.json({ 'thongbao': 'đã sửa' })
    });
})

app.delete('/task/:id',function(req,res,next){
    let id = req.params.id;
    let sql=`delete from task where id=?`;
    db.query(sql,   id,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã xóa'})
});

})

app.get('/task/:id', function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json('task không tồn tại');

    let sql = `SELECT * FROM task where id=${id}`;
    db.query(sql, id, function (err, result) {
        if (err) res.json({ 'message': err });
        else if (result.length == 0) res.json({ 'message': 'không tìm thấy task này' })
        else res.json(result[0])
    })
})

app.listen(port, () => {
    console.log("Ứng dụng đang chạy với cổng:", port);
})