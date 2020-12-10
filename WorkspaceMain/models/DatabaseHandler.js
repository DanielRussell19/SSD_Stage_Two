//Daniel Russell
//MongoDB Server will be required with Driver.

//constants
const client = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const url = "mongodb://localhost:27017/StageTwo";

let User = require('../models/User');
//let Ticket = require('../models/Ticket');
//let Comment = require('../models/Comment');

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
    return new Promise(resolve => {
        client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("tickets").insertOne(ticket,function(err,res){
            if(err) throw err;
            console.log("ticket document added" + res.insertedCount);
        });

        db.close();
        resolve();
        });
    });
}

//Comments
function insertComment(comment){
    return new Promise(resolve => {
        client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        comment.UserID = ObjectId(comment.UserID);
        comment.TicketID = ObjectId(comment.TicketID);

        dbo.collection("comments").insertOne(comment,function(err,res){
            if(err) throw err;
            console.log("comment document added" + res.insertedCount);
        });

        db.close();
        resolve();
        });
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
                      Description: ticket.Description,
                      Assignee: ticket.Assignee } };

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
function updateComment(comment){
    return new Promise(resolve => {
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            var q = {_id: ObjectId(comment._id)};

            var newvalues = { $set: { UserID: comment.UserID, TicketID: comment.TicketID, DOS: comment.DOS, Content: comment.Content}};

            dbo.collection("comments").updateOne(q, newvalues,function(err,res){
                if(err) throw err;
                db.close()
                console.log("comment updated"+res.modifiedCount);
                resolve();
            });
        });
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
function deleteComment(id){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");
    
            var q = {_id: ObjectId(id)};
            console.log(q);

            dbo.collection("comments").deleteOne(q,function(err,res){
                if(err) throw err;
                console.log("comment document deleted");
                db.close();
                resolve(true);
            });
        });
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

function getUsers(){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            dbo.collection("users").find({}).toArray(function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

function getUserByID(id){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            id = ObjectId(id);

            dbo.collection("users").findOne({_id: id}, function(err,res){
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

function getComment(id){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            q = {_id: ObjectId(id)};

            dbo.collection("tickets").findOne(q,function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

function getComments(id){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            dbo.collection("comments").find({TicketID: ObjectId(id)}).toArray(function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

function getCommentsNonId(){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");
    
            dbo.collection("comments").find({}).toArray(function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
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

        try {
            client.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("StageTwo");
    
                dbo.collection("comments").drop(function(err, res){
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
    //poorly implemented seeder method cause holy hell is test data had to fabricate with generated objectid's
    //especially when the relationships rely on them

    //drop pre-existing data
    createDB();
    insertRoles();

    //users
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        var q = [
            {username: 'TestTester', password: 'test', RoleIDs:[2], isloggedin: false },
            {username: 'DevTester', password: 'test', RoleIDs:[1, 2], isloggedin: false},
            {username: 'Dev', password: 'test', RoleIDs:[1], isloggedin: false},
            {username: 'Tester', password: 'test', RoleIDs:[2], isloggedin: false},
            {username: 'HPClient', password: 'test', RoleIDs:[3], isloggedin: false},
            {username: 'AmazonClient', password: 'test', RoleIDs:[3], isloggedin: false},
            {username: 'QulaClient', password: 'test', RoleIDs:[3], isloggedin: false},
            {username: 'OnionClient', password: 'test', RoleIDs:[3], isloggedin: false}
        ];
    
        dbo.collection("users").insertMany(q,function(err,res){
        if(err) throw err;
            console.log("User documents added" + res.insertedCount);
        });

        //tickets
        var q2 = [
            {Title: "Broken HTTP",UserID: null, TicketNumber: 1, DOS: new Date(), Priority:'low', Status: 'open', Description: 'test', Type: 'development', Assignee: null},
            {Title: "What's the Wifi password?",UserID: null, TicketNumber: 2, DOS: new Date(), Priority:'medium', Status: 'closed', Description: 'test', Type: 'development', Assignee: null},
            {Title: "ERROR 404, like what?!!!",UserID: null, TicketNumber: 2, DOS: new Date(), Priority:'high', Status: 'resolved', Description: 'test', Type: 'development', Assignee: null}
        ];
    
         dbo.collection("tickets").insertMany(q2,function(err,res){
         if(err) throw err;
             console.log("ticket documents added" + res.insertedCount);
        });

        var q3 = [
            {UserID:null, TicketID: null, DOS: new Date(), Content: 'test'},
            {UserID:null, TicketID: null, DOS: new Date(), Content: 'tester'},
            {UserID:null, TicketID: null, DOS: new Date(), Content: 'Apples'},
            {UserID:null, TicketID: null, DOS: new Date(), Content: 'Problems'},
            {UserID:null, TicketID: null, DOS: new Date(), Content: 'Your correct!'}
        ];

        dbo.collection("comments").insertMany(q3,function(err,res){
        if(err) throw err;
            console.log("comment documents added" + res.insertedCount);
            fixrelationships();
        });
    
        db.close();
    });  
}

async function fixrelationships(){
    var tickets = await getTickets();
    var comments = await getCommentsNonId();
    var user = await getUser(new User('Tester', 'test'));

    var ticketid = tickets[0]._id;
    var userid = user._id;
    var i = 0;

    do{
        var ticket = tickets[i];
        ticket.UserID = userid;
        ticket.Assignee = user;
        updateTicket(ticket);
        i = i+1;
    }while(tickets[i] != null);

    i = 0;

    do{
        var comment = comments[i];
        comment.UserID = userid;
        comment.TicketID = ticketid;
        updateComment(comment);
        i = i+1;
    }while(comments[i] != null);
}

//Exports class DBHandler
exports.seedDatabase = seedDatabase;
exports.dropCollections = dropCollections;

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.getUserByID = getUserByID;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

exports.getTickets = getTickets;
exports.getTicket = getTicket;
exports.insertTicket = insertTicket;
exports.updateTicket = updateTicket;
exports.deleteTicket = deleteTicket;

exports.getComment = getComment;
exports.getComments = getComments;
exports.insertComment = insertComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;