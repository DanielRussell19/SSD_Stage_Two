//Daniel Russell

//Imports
let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');

//Router responses
router.get("/", function(req,res){
    res.render('./main/index', {title: 'Safari Security Ticket Index', layout: 'main'} );
});

router.get("/AboutUs", function(req,res){
    res.render('./main/aboutus', {title: 'Safari Security About Us', layout: 'main'} );
});

router.get("/SeedDB", async function(req,res){
    db.seedDatabase();

    res.render('./main/index', {title: 'Tempoary Seeder Page', layout: 'main'} );
});

router.get("/DropDB", function(req,res){
    db.dropCollections();
    res.render('./main/index', {title: 'Tempoary Seeder Page', layout: 'main'} );
});

//Error page router
router.use(function(req,res){
    var error;
    
    try{
        error = req.cookies.error;
    }
    catch{
        error = null;
    }

    res.render('./main/error', {title: '404 Oppsie', error: error, layout: 'main'} );
    res.status(404);
});

module.exports = router;