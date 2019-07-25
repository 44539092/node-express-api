const db=require('./mysql')
const crypto = require("crypto");
const express=require("express")
const bodyParser=require("body-parser")
const multer = require('multer')
const JwtUtil = require('./token/jwt');
const cookieParase = require('cookie-parser');
var session = require('express-session');
const app=express();
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {maxAge: 60000}}));
var fs = require('fs');
var path = require('path')
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'upload')))
app.use(bodyParser.json());
app.use(cookieParase())
const cors = require('./cors');//跨域问题
app.use(cors({
    optionIntercept: false,
    customAllowHeaders:['token']
}));
var server=app.listen("80",()=>{
    console.log("服务器启动")
});
// new JwtUtil(13).generateToken()
// 接口路由
var register=require("./register");register(app,db,crypto)//注册接口
var login=require("./login");login(app,db,crypto,JwtUtil)//登陆接口
var uploadPicture=require("./uploadPicture");uploadPicture(app,multer,fs,path,db)//登陆接口
var token=require("./token");token(app,JwtUtil,db)//token异地登录免密登录接口
var lifeessays=require('./lifeessays');lifeessays(app,db) //生活随笔全套接口
var article=require('./article');article(app,db) //文章详细内容接口
var comment=require('./comment');comment(app,db) //评论接口
var replay=require('./replay');replay(app,db)//回复接口
var ceshi=require('./ceshi');ceshi(app,db)
//点赞接口
app.post('/praise',(req,res)=>{
    var user_id=req.body.userid
    var article_id=req.body.articleid
    db.query("select * from praisestate where user_id=? and article_id=?",[user_id,article_id],(err,results,file)=>{
        if(err)throw err
        if(results==""){
            db.query("INSERT INTO praisestate (user_id,article_id)values(?,?)",[user_id,article_id],(err,results,file)=>{
                if(err)throw err
                if(results.affectedRows==1){
                    db.query("UPDATE user_upload_article set praiseNum=praiseNum+1 WHERE id=?",[article_id],(err,results,file)=>{
                    if(err)throw err
                    res.json({
                        code:200,
                        message:{
                            affectedRows:results.affectedRows
                        }
                    })
                    })
                }
            })
            
        }else{
            res.json({
                code:400,
                message:'该用户已经点赞过'
            })
        }
    })
})
//热门排行
app.get('/hotarticle',(req,res)=>{
    db.query("select * from user_upload_article order by praisenum desc",(err,results,file)=>{
        if(err)throw err
        res.json({
            data:results
        }) 
    })
})
//收藏排行
app.get('/collection',(req,res)=>{
    db.query("select * from user_upload_article order by collectionnum desc",(err,results,file)=>{
        if(err)throw err
        res.json({
            data:results
        })
    })
})
//所有文章分页查询
app.get('/searcharticle',(req,res)=>{
    const page=JSON.parse(req.query.page)
    const pageNum=JSON.parse(req.query.pageNum)
    const select=[(page-1)*pageNum,pageNum]
    db.query('select * from user_upload_article where state=1 limit ? ,?',select,function (err,results,fileds) {
        if(err)throw err;
        res.json({
            code:200,
            message:results
        })
    })
})





