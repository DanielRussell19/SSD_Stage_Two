let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');

//Inital responses
router.get("/CreateTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/createticket', {title: 'Ticket Creation', layout: 'main'} );
});

router.post("/CreateTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/createticket', {title: 'Ticket Creation', layout: 'main'} );
});

router.get("/UpdateTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/updateticket', {title: 'Update Ticket', layout: 'main'} );
});

router.post("/UpdateTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/updateticket', {title: 'Update Ticket', layout: 'main'} );
});

router.get("/DeleteTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/deleteticket', {title: 'Delete Ticket', layout: 'main'} );
});

router.post("/DeleteTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/deleteticket', {title: 'Delete Ticket', layout: 'main'} );
});

router.get("/TicketListing", async function(req,res){
    console.log(req.session.user);
    if(!req.session.user){res.redirect('/Error');}

    var tickets = await db.getTickets();

    res.render('./ticket/ticketindex', {title: 'Safari Security Ticket Index', tickets: tickets, layout: 'main'} );
});

router.get("/ViewTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/ticket', {title: 'Safari Security Ticket', layout: 'main'} );
});

module.exports = router;