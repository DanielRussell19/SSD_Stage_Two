let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');

const { check, validationResult } = require('express-validator');

//Inital responses
router.get("/CreateTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/createticket', {title: 'Ticket Creation', layout: 'main'} );
});

router.post("/CreateTicket", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./ticket/createticket', {title: 'Ticket Creation', layout: 'main'} );
});

router.get("/UpdateTicket/:id", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticketid = req.params.id;

    console.log(ticketid);

    var ticket = await db.getTicket(ticketid);

    console.log(ticket);

    res.render('./ticket/updateticket', {title: 'Update Ticket',ticket: ticket, layout: 'main'} );
});

router.post("/UpdateTicket", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticket = { _id: req.body._id,
        Title: req.body.title,
        UserID: req.body.userid,
        TicketNumber: req.body.ticketnumber,
        DOS: req.body.dos,
        Priority: req.body.priority,
        Status: req.body.status,
        Description: req.body.description,
        Type: req.body.type}

    db.updateTicket(ticket);
    res.redirect('/TicketListing');
});

router.get("/DeleteTicket/:id", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticketid = req.params.id;
    var ticket = await db.getTicket(ticketid);

    res.render('./ticket/deleteticket', {title: 'Delete Ticket', ticket: ticket, layout: 'main'} );
});

router.post("/DeleteTicket", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var id = req.body._id;
    db.deleteTicket(id);

    res.redirect('/TicketListing');
});

router.get("/TicketListing", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var tickets = await db.getTickets();

    res.render('./ticket/ticketindex', {title: 'Safari Security Ticket Index', tickets: tickets, layout: 'main'} );
});

router.get("/ViewTicket/:id", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticketid = req.params.id;
    var ticket = await db.getTicket(ticketid);

    var creator = false;
    var closed = false;

    var comments = await db.getComments(ticketid);

    if(ticket.UserID == req.session.user._id){
        creator = true;
    }

    if(ticket.Status == 'closed'){
        closed = true;
    }

    res.render('./ticket/ticket', {title: 'Safari Security Ticket', ticket: ticket, comments: comments, creator: creator, closed: closed, layout: 'main'} );
});

module.exports = router;