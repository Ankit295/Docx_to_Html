
var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var mammoth = require("mammoth");
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+ '-' + file.fieldname+'.docx');
  }
});
var upload = multer({ storage : storage}).single('userfile');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index5.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log(req.file);
        var path= req.file.path;
   		mammoth.convertToHtml({path: path})
   		   .then(function(result){        
        		var html = result.value; // The generated HTML 
        		var messages = result.messages; // Any messages, such as warnings during conversion 
        		res.send(html);
    })
      .done();
  });	     
        
    });


app.listen(3000,function(){
    console.log("Working on port 3000");
});