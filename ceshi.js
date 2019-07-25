function ceshi(app,db){
    app.post('/1',(q,s)=>{
        var j=q.body.j
        db.query('select * from comment,replay where comment.id=replay.comment_id',(err,resulet,file)=>{
            if(err)throw err
            s.json({
                data:resulet
            })
        })
        // db.query(`
        // SELECT * FROM comment LEFT JOIN replay ON comment.id=replay.comment_id
        // where article_id=?`,[j],(e,r,f)=>{
        //     if(e)throw e
        //     s.json({
        //         data:r
        //     })
        // })
    })
}
module.exports=ceshi