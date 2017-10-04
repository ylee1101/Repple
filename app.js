// Dependencies
var express = require('express');
var fs = require('fs');

var app = express();

// Main
app.get('/',function(req,res){
	
	return res.redirect('/public/driverHome.html');

});

app.use('/public', express.static(__dirname + '/public'));

/** Implementing Simple Music Server using Express JS **/
app.get('/music', function(req,res){
	// File to be served
	
	var fileId = req.query.id; 
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	
	});
	
});

app.get('/download', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
	
	
});

var port = process.env.port || 3000;

app.listen(port, function(){
    console.log('app is listening at localhost:' + port);
});
