let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');

const { check, validationResult } = require('express-validator');

//Inital response;

//,[check('username').escape(), check('password').escape()],

router.post("/CreateComment/:id", function(req,res){
    var ticketid = req.params.id;
    db.insertComment({UserID: req.session.user._id, TicketID: ticketid, DOS: new Date(), Content: req.body.content});

    res.redirect('/ViewTicket/'+ticketid);
});

//,[check('username').escape(), check('password').escape()],

router.get("/DeleteComment/:id", function(req,res){
    var ticketid = req.params.id;

    db.deleteComment(ticketid);

    res.redirect('/TicketListing');
});

module.exports = router;