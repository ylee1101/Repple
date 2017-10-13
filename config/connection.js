var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
        root: 3306,
        host: "localhost",
        user: "root",
        password: "root",
        database: "register",
  });
};

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;

//*********NEW CODE WITH PASSPORT TO AUTHENTICATE

 //load bcrypt
 var bCrypt = require('bcrypt-nodejs');
 
   module.exports = function(passport,user){
 
   var Artist = artist;
   var LocalStrategy = require('passport-local').Strategy;
 
 
   passport.serializeArtist(function(artist, done) {
           done(null, artist.id);
       });
 
 
   // used to deserialize the user
   passport.deserializeArtist(function(id, done) {
       Artist.findById(id).then(function(artist) {
         if(artist){
           done(null, artist.get());
         }
         else{
           done(artist.errors,null);
         }
       });
 
   });
 
 
   passport.use('local-signup', new LocalStrategy(
 
     {           
       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
     },
 
     function(req, email, password, done){
        
 
       var generateHash = function(password) {
       return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
       };
 
        Artist.findOne({where: {email:email}}).then(function(artist){
 
       if(artist)
       {
         return done(null, false, {message : 'That email is already taken'} );
       }
 
       else
       {
         var artistPassword = generateHash(password);
         var data =
         { 
            email: email,
            
            password: userPassword,

            firstname: req.body.firstname,

            lastname: req.body.lastname

            
         };
 
 
         User.create(data).then(function(newArtist,created){
           if(!newArtist){
             return done(null,false);
           }
 
           if(newArtist){
             return done(null,newArtist);
             
           }
 
 
         });
       }
 
 
     }); 
 
 
 
   }
 
 
 
   ));
     
   //LOCAL SIGNIN
   passport.use('local-signin', new LocalStrategy(
     
   {
 
   // by default, local strategy uses username and password, we will override with email
   usernameField : 'email',
   passwordField : 'password',
   passReqToCallback : true // allows us to pass back the entire request to the callback
   },
 
   function(req, email, password, done) {
 
     var User = user;
 
     var isValidPassword = function(userpass,password){
       return bCrypt.compareSync(password, userpass);
     }
 
     User.findOne({ where : { email: email}}).then(function (user) {
 
       if (!user) {
         return done(null, false, { message: 'Email does not exist' });
       }
 
       if (!isValidPassword(user.password,password)) {
 
         return done(null, false, { message: 'Incorrect password.' });
 
       }
 
       var userinfo = user.get();
 
       return done(null,userinfo);
 
     }).catch(function(err){
 
       console.log("Error:",err);
 
       return done(null, false, { message: 'Something went wrong with your Signin' });
 
 
     });
 
   }
   ));
 
   }