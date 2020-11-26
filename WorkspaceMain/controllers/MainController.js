let express = require('express');
let router = express.Router();
let db = require('../models/DatabaseHandler');

var dbh = new db();

//Inital responses
router.get("/", function(req,res){
    res.render('./main/index', {title: 'Safari Security Ticket Index', layout: 'main'} );
    dbh.createDB();
});

router.get("/AboutUs", function(req,res){
    res.render('./main/index', {title: 'Safari Security About Us', layout: 'main'} );
});

module.exports = router;