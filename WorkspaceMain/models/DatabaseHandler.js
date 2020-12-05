//Daniel Russell
//MongoDB Server will be required with Driver.

//constants
const client = require('mongodb').MongoClient;
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
async function insertRoles(){
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
    });
}

//Tickets
async function insertTicket(ticket){
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
async function insertComment(comment){
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
async function updateUser(id, user){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("users").updateOne(id,user,function(err,res){
            if(err) throw err;
            console.log("User updated");
        });

        db.close();
    });
}

//Tickets
async function updateTicket(id, ticket){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("tickets").updateOne(id,ticket,function(err,res){
            if(err) throw err;
            console.log("Ticket updated");
        });

        db.close();
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
async function deleteUser(id){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("users").deleteOne(id,function(err,res){
            if(err) throw err;
            console.log("User document deleted");
        });

        db.close();
    });
}

//Tickets
async function deleteTicket(id){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("tickets").deleteOne(id,function(err,res){
            if(err) throw err;
            console.log("Ticket document deleted");
        });

        db.close();
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
                console.log(res);
                resolve(res);
            });
    
            db.close();
        });
    });
}

async function getTicket(ticketid){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("tickets").findOne(ticketid,function(err,res){
            if(err) throw err;
            return res;
        });

        db.close();
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

//database seeder method
async function seedDatabase(){
    
    //drop pre-existing data
    this.createDB();
    this.insertRoles();

    //users
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        var q = [
            {username: 'test', password: 'test', RoleIDs:[2] },
            {username: 'Dave', password: 'test', RoleIDs:[1, 2]},
            {username: 'Lilith', password: 'test', RoleIDs:[1]},
            {username: 'Paul', password: 'test', RoleIDs:[2]},
            {username: 'HP', password: 'test', RoleIDs:[3]},
            {username: 'Amazon', password: 'test', RoleIDs:[3]},
            {username: 'Qula', password: 'test', RoleIDs:[3]},
            {username: 'Onion', password: 'test', RoleIDs:[3]}
        ];
    
        dbo.collection("users").insertMany(q,function(err,res){
        if(err) throw err;
            console.log("User documents added" + res.insertedCount);
        });
    
        db.close();
    });  

    // //tickets
    // q = {

    // };

    // client.connect(url, function(err, db){
    //     if(err) throw err;
    //     var dbo = db.db("StageTwo");
    
    //     dbo.collection("tickets").insertMany(q,function(err,res){
    //     if(err) throw err;
    //         console.log("ticket documents added" + res.insertedCount);
    //     });
    
    //     db.close();
    // });

    // //comments
    // q = {

    // };

    // client.connect(url, function(err, db){
    //     if(err) throw err;
    //     var dbo = db.db("StageTwo");
    
    //     dbo.collection("comments").insertMany(q,function(err,res){
    //     if(err) throw err;
    //         console.log("comment documents added" + res.insertedCount);
    //     });
    
    //     db.close();
    // });
}

//Exports class DBHandler
exports.seedDatabase = seedDatabase;
exports.getUser = getUser;