let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

//Inital responses
router.get("/CreateComment", function(req,res){
    res.render('./comment/createcomment', {title: 'Comment Creation', layout: 'main'} );
});

router.post("/CreateComment", function(req,res){
    res.render('./comment/createcomment', {title: 'Comment Creation', layout: 'main'} );
});

router.get("/UpdateComment", function(req,res){
    res.render('./comment/updatecomment', {title: 'Update Comment', layout: 'main'} );
});

router.post("/UpdateComment", function(req,res){
    res.render('./comment/updatecomment', {title: 'Update Comment', layout: 'main'} );
});

router.get("/DeleteComment", function(req,res){
    res.render('./comment/deletecomment', {title: 'Delete Comment', layout: 'main'} );
});

router.post("/DeleteComment", function(req,res){
    res.render('./comment/deletecomment', {title: 'Delete Comment', layout: 'main'} );
});

module.exports = router;