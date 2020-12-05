let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let User = require('../models/User');

//Inital responses
router.get("/Login", function(req,res){
    if(req.session.user != null){res.redirect('/TicketListing');}

    res.render('./user/login', {title: 'Safari Security Login', layout: 'main'} );
});

router.post("/Login", async function(req,res){
    if(!req.body.username || !req.body.password){
        res.redirect("/Login");
    }
    else{
        var user = await db.getUser(new User(req.body.username, req.body.password));

        if(user == null || !user){
            res.redirect("/Error");
        }
        else if(user.isloggedin == true){
            res.redirect("Error");
        }

        //db.loginUser(user);
        //user.isloggedin = true;

        req.session.user = user;
        res.redirect("/TicketListing");
    }
});

router.get("/Loginout", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    var name = req.session.user.username;
    res.render('./user/logout', {title: 'Safari Security Logout', name: name, layout: 'main'} );
});

router.post("/Loginout", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    //db.logoutUser(req.session.user);

    req.session.user = null;
    res.redirect('/');
});

router.get("/UpdateUser", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./user/userdetails', {title: 'Safari Security Edit User', layout: 'main'} );
});

router.post("/UpdateUser", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./user/userdetails', {title: 'Safari Security Edit User', layout: 'main'} );
});

router.get("/DeleteUser", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./user/deleteuser', {title: 'Safari Security Delete Confirmation', layout: 'main'} );
});

router.post("/DeleteUser", function(req,res){
    if(!req.session.user){res.redirect('/Error');}

    res.render('./user/deleteuser', {title: 'Safari Security Delete Confirmation', layout: 'main'} );
});

module.exports = router;