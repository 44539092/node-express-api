// 生活随笔全套api
function lifeessays(app,db){
    // 生活随笔
    app.get('/lifeessays',(req,res)=>{
        var userid=(req.query.userid)
        db.query("select * from user_upload_article where user_id=?",[userid],(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:result
            })
        })
    })

    // 个人随笔
    app.get('/personaltype',(req,res)=>{
        var userid=(req.query.userid)
        var type=(req.query.type)
        console.log(userid,type)
        db.query("select * from user_upload_article where user_id=? and articletype=?",[userid,type],(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:result
            })
        })
    })

    // 个人作品
    app.get('/personalwork',(req,res)=>{
        var userid=(req.query.userid)
        var type="个人随笔"
        console.log(userid,type)
        db.query("select * from user_upload_article where user_id=? and articletype!=?",[userid,type],(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:result
            })
        })
    })
}
module.exports=lifeessays