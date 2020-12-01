let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

//Inital responses
router.get("/Login", function(req,res){
    res.render('./main/login', {title: 'Safari Security Ticket Index', layout: 'main'} );
});

router.get("/UpdateUser", function(req,res){
    res.render('./main/userdetails', {title: 'Safari Security About Us', layout: 'main'} );
});

router.get("/DeleteUser", function(req,res){
    res.render('./main/deleteuser', {title: 'Safari Security About Us', layout: 'main'} );
});

module.exports = router;