let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

//Inital responses
router.get("/TicketListing", function(req,res){
    res.render('./ticket/ticketindex', {title: 'Safari Security Ticket Index', layout: 'main'} );
});

router.get("/ViewTicket", function(req,res){
    res.render('./ticket/ticket', {title: 'Safari Security Ticket', layout: 'main'} );
});

module.exports = router;