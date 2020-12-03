let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let dbh = new db();

//Inital responses
router.get("/CreateTicket", function(req,res){
    res.render('./ticket/createticket', {title: 'Ticket Creation', layout: 'main'} );
});

router.post("/CreateTicket", function(req,res){
    res.render('./ticket/createticket', {title: 'Ticket Creation', layout: 'main'} );
});

router.get("/UpdateTicket", function(req,res){
    res.render('./ticket/updateticket', {title: 'Update Ticket', layout: 'main'} );
});

router.post("/UpdateTicket", function(req,res){
    res.render('./ticket/updateticket', {title: 'Update Ticket', layout: 'main'} );
});

router.get("/DeleteTicket", function(req,res){
    res.render('./ticket/deleteticket', {title: 'Delete Ticket', layout: 'main'} );
});

router.post("/DeleteTicket", function(req,res){
    res.render('./ticket/deleteticket', {title: 'Delete Ticket', layout: 'main'} );
});

router.get("/TicketListing", function(req,res){
    res.render('./ticket/ticketindex', {title: 'Safari Security Ticket Index', layout: 'main'} );
});

router.get("/ViewTicket", function(req,res){
    res.render('./ticket/ticket', {title: 'Safari Security Ticket', layout: 'main'} );
});

module.exports = router;