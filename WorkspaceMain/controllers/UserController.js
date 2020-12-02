let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

//Inital responses
router.get("/Login", function(req,res){
    res.render('./user/login', {title: 'Safari Security Login', layout: 'main'} );
});

router.get("/UpdateUser", function(req,res){
    res.render('./user/userdetails', {title: 'Safari Security Edit User', layout: 'main'} );
});

router.get("/DeleteUser", function(req,res){
    res.render('./user/deleteuser', {title: 'Safari Security Delete Confirmation', layout: 'main'} );
});

module.exports = router;