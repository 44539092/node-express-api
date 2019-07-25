//登陆接口
function login(app,db,crypto,JwtUtil){
    app.post('/login',(req,res)=>{        
        var username=req.body.username
        var password=req.body.password
        var email=req.body.email
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(password).digest("hex");
        db.query("select * from user where username=? or email=?",[username,email],(err,resulets,fileds)=>{
            if(err)throw err
            if(resulets==""){
                return res.json({
                    code:400,
                    message:"Username / Email不存在"
                })
            }
            for(var key in resulets){
                if((resulets[key].username==username || resulets[key].email )&&resulets[key].password==newPas){
                    let id=resulets[0].token
                    let jwt = new JwtUtil(id)
                    let token = jwt.generateToken();
                    res.json({
                        code:200,
                        message:"登录成功",
                        token:token,
                        data:{
                            id:resulets[0].id,
                            username:resulets[0].username,
                            name:resulets[0].name,
                            email:resulets[0].email,
                            phone:resulets[0].phone
                        },
                    })
                    db.query('update user set token=? where id=?',[Math.abs(id-1),resulets[0].id],(err,resulets,file)=>{
                        if(err) throw err
                    })
                }else{
                    res.json({
                        code:400,
                        message:"密码错误"
                    })
                }
            }
        })
    })
}
module.exports=login