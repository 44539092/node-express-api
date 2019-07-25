function replay(app,db){
    app.post('/replay',(req,res)=>{
        var a=req.body
        var comment_id=a.comment_id
        var user_id=a.user_id
        var replay_id=a.replay_id
        var replay_content=a.replay_content
        var replay_name=a.replay_name
        var create_time=new Date()
        var user_name=a.user_name
        var val=[comment_id,user_id,replay_id,replay_content,replay_name,create_time,user_name]
        db.query(`insert into replay
        (comment_id,user_id,replay_id,replay_content,replay_name,create_time,user_name)
        values(?,?,?,?,?,?,?)
        `,val,(err,result,file)=>{
            if(err)throw err
            res.json({
                code:200,
                data:"插入成功"
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
module.exports=replay