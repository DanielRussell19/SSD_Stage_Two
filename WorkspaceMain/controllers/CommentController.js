//Daniel Russell
//imports
let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');

const { check, validationResult } = require('express-validator');

//Routers
router.post("/CreateComment/:id",[check('content').escape()], function(req,res){
    if(!req.session.user){res.redirect('/Error');}
    var ticketid = req.params.id;
    
    console.log("Post insert comment: " + req.body.content)

    db.insertComment({User: {_id: req.session.user._id, username: req.session.user.username}, TicketID: ticketid, DOS: new Date(), Content: req.body.content});
    res.redirect('/ViewTicket/'+ticketid);
});

router.post("/DeleteComment", function(req,res){
    if(!req.session.user){res.redirect('/Error');}
    var ticketid = req.body.ticketid;
    var userid = req.body.userid;
    var commentid = req.body.commentid;

    if(req.session.user._id != userid){
        res.redirect('/ViewTicket/'+ticketid);
    }
    else{
        db.deleteComment(commentid);
        res.redirect('/ViewTicket/'+ticketid);
    }
});

module.exports = router;