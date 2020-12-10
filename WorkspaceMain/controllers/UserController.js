let express = require('express');
let router = express.Router();

let db = require('../models/DatabaseHandler');
let User = require('../models/User');

const { check, validationResult } = require('express-validator');

//Inital responses
router.get("/Login", function(req,res){
    if(req.session.user != null){res.redirect('/TicketListing');}
    else{
        res.render('./user/login', {title: 'Safari Security Login', layout: 'main'} );
    }
});

router.post("/Login",[check('username').escape(), check('password').escape()], async function(req,res){

    if(!req.body.username || !req.body.password){
        res.cookie('error', 'Please fill both fields');
        res.redirect("/Login");
    }
    else{
        var user = await db.getUser(new User(req.body.username, req.body.password));

        if(user == null || !user){
            res.cookie('error', 'No User Found');
            res.redirect("/Error");
        }
        else if(user.isloggedin == true){
            res.cookie('error', 'User is logged in');
            res.redirect("Error");
        }
        else if(user.isloggedin == false){
            user.isloggedin = true;
            db.loginUser(user);
    
            req.session.user = user;
            res.redirect("/TicketListing");
        }
    }
});

router.get("/Loginout", function(req,res){
    if(!req.session.user){res.cookie('error', 'Session Invalid'); res.redirect('/Error');}
    else{
        var name = req.session.user.username;
        res.render('./user/logout', {title: 'Safari Security Logout', name: name, layout: 'main'} );
    }
});

router.post("/Loginout", async function(req,res){
    if(!req.session.user){res.cookie('error', 'Session Invalid'); res.redirect('/Error');}
    else{
        var user = req.session.user;
        user.isloggedin = false;
        db.logoutUser(user);
    
        req.session.user = null;
        res.redirect('/');
    }
});

router.get("/UpdateUser", function(req,res){
    if(!req.session.user){res.cookie('error', 'Session Invalid'); res.redirect('/Error');}
    else{
        var user = req.session.user;
        res.render('./user/userdetails', {title: 'Safari Security Edit User', user: user, layout: 'main'} );
    }
});

router.post("/UpdateUser",[check('username').escape(), check('password').escape()], async function(req,res){
    if(!req.session.user){res.cookie('error', 'Session Invalid'); res.redirect('/Error');}
    else{
        var user = {_id: req.body._id, username: req.body.username, password: req.body.password, RolesIDs: req.body.RoleIDs, isloggedin: req.body.isloggedin};
        db.updateUser(user);
        req.session.user = user;
        res.redirect("/TicketListing");
    }
});

router.get("/DeleteUser", function(req,res){
    if(!req.session.user){res.cookie('error', 'Session Invalid'); res.redirect('/Error');}
    else{
        res.render('./user/deleteuser', {title: 'Safari Security Delete Confirmation', layout: 'main'} );
    }
});

router.post("/DeleteUser", async function(req,res){
    if(!req.session.user){res.cookie('error', 'Session Invalid'); res.redirect('/Error');}
    else{
        var user = req.session.user;
        db.deleteUser(user);
        req.session.user = null;
        res.redirect("/");
    }
});

module.exports = router;