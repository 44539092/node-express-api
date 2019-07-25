//上传图片查询
function uploadPicture(app,multer,fs,path,db){
    var storage=multer.diskStorage({
        destination: function (req, file, cb) {
            // 接收到文件后输出的保存路径（若不存在则需要创建）
            cb(null, 'upload/');    
        },
        filename: function (req, file, cb) {
            // 将保存文件名设置为 时间戳 + 文件原始名，比如123.jpg
            cb(null,file.originalname);  
        }
    })
    var createFolder = function(folder){
        try{
            // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
            // 如果文件路径不存在将会抛出错误"no such file or directory"
            fs.accessSync(folder); 
        }catch(e){
            // 文件夹不存在，以同步的方式创建文件目录。
            fs.mkdirSync(folder);
        }  
    };    
    var uploadFolder = './upload/';
    createFolder(uploadFolder);
    app.use(multer({ storage: storage }).single('image'));
    app.post('/admit',(req,res)=>{
        var editor=req.body.editor
        var files=(req.file)
        var imgname=files.filename
        var url='http://localhost:80/'
        var target=url+imgname
        console.log(target)
        var userid=req.body.id
        var title=req.body.title
        var author=req.body.author
        var state=req.body.state
        var articletype=req.body.articletype
        var createtime=new Date()
        var value=[title,editor,target,userid,author,state,articletype,createtime]
        db.query('select * from user_upload_article where title=?',[title],(err,r,file)=>{
            if(err) throw err
            if(r==""){
               db.query(`
                insert into user_upload_article 
                (title,content,coverimg,user_id,author,state,articletype,creat_time) 
                value
                (?,?,?,?,?,?,?,?)
                `,value,(err,results,filed)=>{
                    if(err)throw err
                    res.json({
                        code:200,
                        message:"上传成功"
                    })
                }) 
            }else{
                res.json({
                    code:400,
                    message:"标题名字重复"
                })
            }
        })
        
    })
}
module.exports=uploadPicture