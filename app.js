// Dependencies
var express = require('express');
var fs = require('fs');

var app = express();

// exports fanburst-api 
module.exports = require('./lib/fanburst-api');

// Module Dependencies
var Strategy = require('./strategy');

/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Expose constructors.
 */
exports.Strategy = Strategy;

// Fanburst api info

// Client ID: 3adad1d1-c958-4b47-8631-bff3ddec3f3d

// Secret: f0f59aa9b01f5bde6042efe8aaee2925aede0ed987712bec86c346b7e72fe5c3

// Scopes: Using default scope

// Callback urls: urn:ietf:wg:oauth:2.0:oob

// authorization code: deabb1e5de2b025bf71715049c2da85d3efaa6411ea854eb15f734f49896b4cb

// access token: 048a60c6739f9ab032b6443b9a759ed77f2c3952cb359697c370ebf48fdf9710

// Main
app.get('/',function(req,res){
	
	return res.redirect('/public/driverHome.html');

});

app.use('/public', express.static(__dirname + '/public'));

// implementing music server through express
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
