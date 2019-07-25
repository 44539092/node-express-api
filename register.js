//注册接口
function register(app,db,crypto){
    app.post('/adduser',(req,res)=>{
    var username=req.body.username
    var password=req.body.password
    var name=req.body.name
    var phone=req.body.phone
    var email=req.body.email
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    // var createtime=(new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()+' '+new Date().toLocaleTimeString())
    var createtime=new Date()
    var add='insert into user (username,password,name,phone,email,create_time) values (?,?,?,?,?,?)'
    db.query('select * from user',function (err,resulets,fileds) {
        if(err)throw err;
        for(var key in resulets){
            if(resulets[key].username==username){
                return res.json({
                    code:400,
                    message:'账号重复'
                })
            }
            else if(resulets[key].email==email){
                return res.json({
                    code:400,
                    message:'邮箱重复'
                })
            }
        }
        var addcontent=[username,newPas,name,phone,email,createtime]
        db.query(add,addcontent,(err,resul,fileds)=>{
            if(err)throw err
            return res.json({
                code:200,
                message:'注册成功'
            })
        })
    })
})
}
module.exports=register
