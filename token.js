function token(app,JwtUtil,db){
    //通过token和userid去判断是否过期以及异地登陆
    app.get('/token',(req,res)=>{
        let token = req.headers.token;
        let userid=req.query.userid;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken()
        if(result=="err"){
            res.json({
                code:400,
                message:"token已经过期失效"
            })
        }else{
            db.query("select * from user where id=?",[userid],(err,results,file)=>{
                if(err)throw err
                if(result==results[0].token){
                    res.json({
                        code:500,
                        message:"异地登陆"
                    })
                }
                else{
                    res.json({
                        code:200
                    })
                }
            })
        }
        
    })
    //token验证 异地登陆
    app.post('/tokentest',(req,res)=>{
        
    })
}
module.exports=token