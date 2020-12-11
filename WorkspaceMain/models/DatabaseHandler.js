//Daniel Russell
//MongoDB Server will be required with Driver.

//constants
const client = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const url = "mongodb://localhost:27017/StageTwo";

let User = require('../models/User');

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

//insert roles
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

//insert ticket
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

//insert comment
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
                   User: ticket.User,
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

            var newvalues = { $set: { User: comment.User, TicketID: comment.TicketID, DOS: comment.DOS, Content: comment.Content}};

            dbo.collection("comments").updateOne(q, newvalues,function(err,res){
                if(err) throw err;
                db.close()
                console.log("comment updated"+res.modifiedCount);
                resolve();
            });
        });
    });
}

//DB deletes

//delete user by user object
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

//delete ticket by id
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

//delete comment by id
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

//DB get users//

//get user similar to passed user object
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

//get all users
function getUsers(){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            dbo.collection("users").find({}, {_id: 1, username: 1}).toArray(function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

//get a specific user by id
function getUserByID(id){
    return new Promise(resolve => {
        
        client.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("StageTwo");

            id = ObjectId(id);

            dbo.collection("users").findOne({_id: id},{_id: 1, username: 1}, function(err,res){
                if(err) throw err;
                db.close();
                resolve(res);
            });
        });
    });
}

//get a specific ticket by ticket id
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

//get all tickets
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

//get specific comment by comment id
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

//get all comments with ticket id relation
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

//get all comments with no ticket id relation
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

//drop collections stored on mongodb
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

//login logout methods reusing the updateuser method
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
    //poorly implemented seeder method cause holy hell is test data hard to fabricate with asynconously generated objectid's
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
            {Title: "Broken HTTP",User: null, TicketNumber: 1, DOS: new Date(), Priority:'low', Status: 'open', Description: 'test', Type: 'development', Assignee: null},
            {Title: "What's the Wifi password?",User: null, TicketNumber: 2, DOS: new Date(), Priority:'medium', Status: 'closed', Description: 'test', Type: 'development', Assignee: null},
            {Title: "ERROR 404, like what?!!!",User: null, TicketNumber: 2, DOS: new Date(), Priority:'high', Status: 'resolved', Description: 'test', Type: 'development', Assignee: null}
        ];
    
         dbo.collection("tickets").insertMany(q2,function(err,res){
         if(err) throw err;
             console.log("ticket documents added" + res.insertedCount);
        });

        var q3 = [
            {User:null, TicketID: null, DOS: new Date(), Content: 'test'},
            {User:null, TicketID: null, DOS: new Date(), Content: 'tester'},
            {User:null, TicketID: null, DOS: new Date(), Content: 'Apples'},
            {User:null, TicketID: null, DOS: new Date(), Content: 'Problems'},
            {User:null, TicketID: null, DOS: new Date(), Content: 'Your correct!'}
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
    var i = 0;

    do{
        var ticket = tickets[i];
        ticket.User = {_id: user._id, username: user.username};
        ticket.Assignee = {_id: user._id, username: user.username};
        updateTicket(ticket);
        i = i+1;
    }while(tickets[i] != null);

    i = 0;

    do{
        var comment = comments[i];
        comment.User = {_id: user._id, username: user.username};
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