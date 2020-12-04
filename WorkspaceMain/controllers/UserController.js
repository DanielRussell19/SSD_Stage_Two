let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

let User = require('../models/User');

//Inital responses
router.get("/Login", function(req,res){
    res.render('./user/login', {title: 'Safari Security Login', layout: 'main'} );
});

router.post("/Login", function(req,res){
     if(!req.body.username || !req.body.password){
         console.log("Invalid");
         res.redirect('/error');
     }
     else if(dbh.lookupUser(new User(req.body.username, req.body.password)) == null){
         console.log("Not Found");
         res.redirect('/error');
     }

    console.log(dbh.lookupUser(new User(req.body.username, req.body.password)));
    res.redirect('/TicketListing');
});

router.get("/Loginout", function(req,res){
    res.render('./user/logout', {title: 'Safari Security Logout', layout: 'main'} );
});

router.post("/Loginout", function(req,res){
    res.redirect('/');
});

router.get("/UpdateUser", function(req,res){
    res.render('./user/userdetails', {title: 'Safari Security Edit User', layout: 'main'} );
});

router.post("/UpdateUser", function(req,res){
    res.render('./user/userdetails', {title: 'Safari Security Edit User', layout: 'main'} );
});

router.get("/DeleteUser", function(req,res){
    res.render('./user/deleteuser', {title: 'Safari Security Delete Confirmation', layout: 'main'} );
});

router.post("/DeleteUser", function(req,res){
    res.render('./user/deleteuser', {title: 'Safari Security Delete Confirmation', layout: 'main'} );
});

module.exports = router;