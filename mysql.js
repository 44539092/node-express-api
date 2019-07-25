const mysql=require('mysql')
var db={}
var connection=mysql.createConnection({
    host        :'localhost',
    user        :'root',
    password    :'root',
    database    :'xunke'
})
connection.connect()
db.query = function(sql,param,callback){  
    if (!sql) { 
      callback(); 
      return; 
    } 
    connection.query(sql,param,function(err, rows, fields) { 
     if (err) { 
      console.log(err); 
      callback(err, null); 
      return; 
     };     
     callback(null, rows, fields); 
    }); 
  } 
module.exports=db