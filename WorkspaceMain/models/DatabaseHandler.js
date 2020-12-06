//Daniel Russell
//MongoDB Server will be required with Driver.

//constants
const client = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const url = "mongodb://localhost:27017/StageTwo";

let User = require('../models/User');
let Ticket = require('../models/Ticket');
let Comment = require('../models/Comment');

//DB Creation and Drop//
async function createDB(){
    client.connect(url, function (err, db) 
    {
        if(err) throw err;
        console.log("Database created!");
        db.close();
    });
}

//DB inserts//

//Roles
function insertRoles(){
    return new Promise(resolve => {
        client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        var roles = [
            {_id: 1, RoleName: 'Developer'},
            {_id: 2, RoleName: 'Tester'},
            {_id: 3, RoleName: 'Client'}
        ];

        dbo.collection("roles").insertMany(roles,function(err,res){
            if(err) throw err;
            console.log("Role documents added" + res.insertedCount);
        });

        db.close();
        resolve();
        });
    });
}

//Tickets
function insertTicket(ticket){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("tickets").insertOne(ticket,function(err,res){
            if(err) throw err;
            console.log("Ticket document added");
        });

        db.close();
    });
}

//Comments
function insertComment(comment){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("comments").insertOne(comment,function(err,res){
            if(err) throw err;
            console.log("Comment document added");
        });

        db.close();
    });
}

//DB updates//

//Users
function updateUser(user){
    return new Promise(resolve => {
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            var q = {_id: ObjectId(user._id)};
            var newvalues = { $set: {username: user.username, password: user.password, RoleIDs: user.RoleIDs, isloggedin: user.isloggedin} };

            dbo.collection("users").updateOne(q,newvalues,function(err,res){
                if(err) throw err;
                db.close();
                console.log("User Modified: " + res.modifiedCount);
                resolve();
            });
        });
    });
}

//Tickets
function updateTicket(ticket){
    return new Promise(resolve => {
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            var q = {_id: ObjectId(ticket._id)};

            var newvalues = { $set: { Title: ticket.Title, TicketNumber: ticket.TicketNumber,
                 Type: ticket.Type,
                  Status: ticket.Status,
                   UserID: ticket.UserID,
                    Priority: ticket.Priority,
                     DOS: ticket.DOS,
                      Description: ticket.Description } };

            console.log(q);
            console.log(newvalues);

            dbo.collection("tickets").updateOne(q, newvalues,function(err,res){
                if(err) throw err;
                db.close()
                console.log("Ticket updated"+res.modifiedCount);
                resolve();
            });
        });
    });
}

//Comments
async function updateComment(id, comment){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("comments").updateOne(id,comment,function(err,res){
            if(err) throw err;
            console.log("Comment updated");
        });

        db.close();
    });
}

//DB Deletes//

//Users
function deleteUser(user){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");
    
        var q = {_id: ObjectId(user._id)};

            dbo.collection("users").deleteOne(q,function(err,res){
                if(err) throw err;
                console.log("User document deleted");
                db.close();
                resolve(true);
            });
        });
    });
}

//Tickets
function deleteTicket(id){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");
    
            var q = {_id: ObjectId(id)};

            dbo.collection("tickets").deleteOne(q,function(err,res){
                if(err) throw err;
                console.log("Ticket document deleted");
                db.close();
                resolve(true);
            });
        });
    });
}

//Comments
async function deleteComment(id){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("comments").deleteOne(id,function(err,res){
            if(err) throw err;
            console.log("Comment document deleted");
        });

        db.close();
    });
}

//gets
function getUser(user){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            dbo.collection("users").findOne(user, function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

function getTicket(ticketid){
    return new Promise(resolve => {
        
            client.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("StageTwo");
    
                q = {_id: ObjectId(ticketid)};

                dbo.collection("tickets").findOne(q,function(err,res){
                    if(err) throw err;
                    db.close();
                    resolve(res);
                });
            });
    });
};

async function getTickets(){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");
    
            dbo.collection("tickets").find({}).toArray(function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

async function getComment(ticketid){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("comments").findOne(ticketid,function(err,res){
            if(err) throw err;
            return res;
        });

        db.close();
    });
}

async function getComments(ticketid){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("comments").findOne(ticketid,function(err,res){
            if(err) throw err;
            return res;
        });

        db.close();
    });
}

function dropCollections(){
    return new Promise(resolve => {
        
        try {
            
            client.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("StageTwo");
        
                dbo.collection("tickets").drop(function(err, res){
                    if(err) throw err;
                });
    
                db.close();
            });

        } catch (error) {
            console.error();
        }

        try {
            client.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("StageTwo");
    
                dbo.collection("users").drop(function(err, res){
                    if(err) throw err;
                });
    
                db.close();
            });   
        } catch (error) {
            console.error();
        }

        try {
            client.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("StageTwo");
    
                dbo.collection("roles").drop(function(err, res){
                    if(err) throw err;
                });
    
                db.close();
            });
        } catch (error) {
            console.error();
        }

        resolve();
    });
}

function loginUser(user){
    user.isloggedin = true;
    updateUser(user);
}

function logoutUser(user){
    user.isloggedin = false;
    updateUser(user);
}

//database seeder method
function seedDatabase(){
    
    //drop pre-existing data
    createDB();
    insertRoles();

    //users
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        var q = [
            {username: 'test', password: 'test', RoleIDs:[2], isloggedin: false },
            {username: 'Dave', password: 'test', RoleIDs:[1, 2], isloggedin: false},
            {username: 'Lilith', password: 'test', RoleIDs:[1], isloggedin: false},
            {username: 'Paul', password: 'test', RoleIDs:[2], isloggedin: false},
            {username: 'HP', password: 'test', RoleIDs:[3], isloggedin: false},
            {username: 'Amazon', password: 'test', RoleIDs:[3], isloggedin: false},
            {username: 'Qula', password: 'test', RoleIDs:[3], isloggedin: false},
            {username: 'Onion', password: 'test', RoleIDs:[3], isloggedin: false}
        ];
    
        dbo.collection("users").insertMany(q,function(err,res){
        if(err) throw err;
            console.log("User documents added" + res.insertedCount);
        });
    
        db.close();
    });  

    var user = getUser(new User('test', 'test'));

    //tickets
    q = [
        {Title: "Broken HTTP",UserID: user._id, TicketNumber: 1, DOS: Date.now(), Priority:'low', Status: 'open', Description: 'test', Type: 'development'},
        {Title: "What's the Wifi password?",UserID: user._id, TicketNumber: 2, DOS: Date.now(), Priority:'medium', Status: 'closed', Description: 'test', Type: 'development'},
        {Title: "ERROR 404, like what?!!!",UserID: user._id, TicketNumber: 2, DOS: Date.now(), Priority:'high', Status: 'resolved', Description: 'test', Type: 'development'}
    ];

    client.connect(url, function(err, db){
         if(err) throw err;
         var dbo = db.db("StageTwo");
    
         dbo.collection("tickets").insertMany(q,function(err,res){
         if(err) throw err;
             console.log("ticket documents added" + res.insertedCount);
        });
    
         db.close();
     });

    //comments
    // q = [
    //     {UserID:'5fca95aab218b22208ccdca6', TicketID:'', DOS: Date.now(), Content: 'test'}
    // ];

    // client.connect(url, function(err, db){
    //     if(err) throw err;
    //     var dbo = db.db("StageTwo");
    
    //     dbo.collection("comments").insertMany(new Comment(),function(err,res){
    //     if(err) throw err;
    //         console.log("comment documents added" + res.insertedCount);
    //     });
    
    //     db.close();
    // });
}

//Exports class DBHandler
exports.seedDatabase = seedDatabase;
exports.dropCollections = dropCollections;

exports.getUser = getUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

exports.getTickets = getTickets;
exports.getTicket = getTicket;
exports.updateTicket = updateTicket;
exports.deleteTicket = deleteTicket;