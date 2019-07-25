function comment(app,db){
    app.post('/comment',(req,res)=>{
        var articleid=req.body.articleid
        var userid=req.body.userid
        var username=req.body.username
        var content=req.body.content
        var createtime=new Date()
        var val=[articleid,userid,username,content,createtime]
        db.query(`insert into comment
        (article_id,user_id,user_name,content,create_time)
        values (?,?,?,?,?)
        `,val,(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:"评论成功"
            })
        })
    })

    app.get('/getcomment',(req,res)=>{
        var article_id=req.query.article_id
        db.query('select * from comment where article_id=?',[article_id],(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:result
            })
        })
    })

    app.get('/getreplay',(req,res)=>{
        db.query('select * from replay',(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:result
            })
        })
    })
}
module.exports=comment