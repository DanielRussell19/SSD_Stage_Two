let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');

const { check, validationResult } = require('express-validator');

//Inital responses
router.get("/CreateTicket", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var users = await db.getUsers();

    res.render('./ticket/createticket', {title: 'Ticket Creation', users: users, layout: 'main'} );
});

//,[check('username').escape(), check('password').escape()],

router.post("/CreateTicket", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var user = req.session.user;
    var assigneduser;

    if(req.body.assignee == null || req.body.assignee == 'null'){
        assigneduser = null;
    }
    else{
        var temp = await db.getUserByID(req.body.assignee);
        assigneduser = {_id: temp._id, username: temp.username};
    }

    var ticket = {Title: req.body.title,
         User: {_id: user._id, username: user.username},
          TicketNumber: null,
           DOS: new Date(),
            Priority: req.body.priority,
             Status: req.body.status,
              Description: req.body.description,
               Type: req.body.type,
                Assignee: assigneduser};

    db.insertTicket(ticket);
    res.redirect('/TicketListing');
});

router.get("/UpdateTicket/:id", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticketid = req.params.id;

    var ticket = await db.getTicket(ticketid);

    if(req.session.user._id != ticket.User._id){res.redirect('/Error');}

    var users = await db.getUsers();

    res.render('./ticket/updateticket', {title: 'Update Ticket',ticket: ticket, users: users, layout: 'main'} );
});

//,[check('username').escape(), check('password').escape()],

router.post("/UpdateTicket", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    if(req.session.user._id != req.body.userid){res.redirect('/Error');}

    if(req.body.assigneenew == null || req.body.assigneenew == 'null'){

        var user = await db.getUserByID(req.body.assigneeold);

        var ticket = { _id: req.body._id,
            Title: req.body.title,
            User: {_id: req.body.userid, username: req.body.username},
            TicketNumber: req.body.ticketnumber,
            DOS: req.body.dos,
            Priority: req.body.priority,
            Status: req.body.status,
            Description: req.body.description,
            Type: req.body.type,
            Assignee: {_id: user._id, username: user.username}};
    
        db.updateTicket(ticket);
        res.redirect('/ViewTicket/'+req.body._id);

        res.redirect('/ViewTicket/'+req.body._id);
    }
    else{

    var user = await db.getUserByID(req.body.assigneenew)

    var ticket = { _id: req.body._id,
        Title: req.body.title,
        User: {_id: req.body.userid, username: req.body.username},
        TicketNumber: req.body.ticketnumber,
        DOS: req.body.dos,
        Priority: req.body.priority,
        Status: req.body.status,
        Description: req.body.description,
        Type: req.body.type,
        Assignee: {_id: user._id, username: user.username}};

    db.updateTicket(ticket);
    res.redirect('/ViewTicket/'+req.body._id);

    }
});

router.get("/DeleteTicket/:id", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticketid = req.params.id;
    var ticket = await db.getTicket(ticketid);

    if(req.session.user._id != ticket.User._id){res.redirect('/Error');}

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
    console.log(tickets);

    res.render('./ticket/ticketindex', {title: 'Safari Security Ticket Index', tickets: tickets, layout: 'main'} );
});

router.get("/ViewTicket/:id", async function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var ticketid = req.params.id;
    var ticket = await db.getTicket(ticketid);

    var creator = false;
    var closed = false;

    var comments = await db.getComments(ticketid);
    console.log(comments);

    if(ticket.User._id == req.session.user._id){
        creator = true;
    }

    if(ticket.Status == 'closed'){
        closed = true;
    }

    res.render('./ticket/ticket', {title: 'Safari Security Ticket', ticket: ticket, comments: comments, creator: creator, closed: closed, layout: 'main'} );
});

module.exports = router;