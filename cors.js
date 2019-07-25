let cors=(options={}) => {
    let allowHeaders='';
    if(options.customAllowHeaders){
        for (let header of options.customAllowHeaders){
            allowHeaders+=`,${header}`
        }
    }
    return (req,res,next)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", `Content-Type,Access-Token${allowHeaders}`);
        res.header("Access-Control-Expose-Headers", "*");
        console.log(options);
        if(req.method==='OPTIONS'&&options.optionIntercept){
            res.send('');
            return;
        }
        next();
    }
};
module.exports=cors;