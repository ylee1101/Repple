var db = require("../models");
var Artist=require("../models/artist")

app.post("/artist",function(req,res){
    console.log(req.body);
    db.Artist.create({
      band: req.body.band,
      genre: req.body.genre,
      country: req.body.country,
      city: req.body.city,
      email: req.body.email,
      facebook: req.body.facebook,
      username: req.body.username,
      password: req.body.password
    })
    .then(function(dbArtist){
    //   res.render('signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard', failureRedirect: '/signup'}
    //    )); 
    res.write("hello world");
      
    })
  });