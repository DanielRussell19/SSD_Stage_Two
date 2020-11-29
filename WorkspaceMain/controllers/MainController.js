let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

//Inital responses
router.get("/", function(req,res){
    res.render('./main/index', {title: 'Safari Security Ticket Index', layout: 'main'} );
});

router.get("/AboutUs", function(req,res){
    res.render('./main/aboutus', {title: 'Safari Security About Us', layout: 'main'} );
});

router.use(function(req,res){
    res.render('./main/error', {title: '404 Oppsie', layout: 'main'} );
    res.status(404);
});

module.exports = router;