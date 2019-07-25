// 查询文章
function article(app,db){
    app.get('/article',(req,res)=>{
        var id=req.query.id
        db.query('select * from user_upload_article where id=?',[id],(err,resulets,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:resulets
            })
        })
    })
}
module.exports=article