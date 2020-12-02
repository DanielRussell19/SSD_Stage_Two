//Daniel Russell
//MongoDB Server will be required with Driver.

//constants
const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/StageTwo";

let User = require('../models/User');
let Ticket = require('../models/Ticket');
let Comment = require('../models/Comment');

//DBHandler class definition
class DBHandler{

//DB Creation and Drop//
createDB(){
    client.connect(url, function (err, db) 
    {
        if(err) throw err;
        console.log("Database created!");
        db.close();
    });
}

//DB inserts//

//Roles
insertRoles(){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        roles = [
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

//Users
insertUser(user){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("users").insertOne(user,function(err,res){
            if(err) throw err;
            console.log("User document added");
        });

        db.close();
    });
}

//Tickets
insertTicket(ticket){
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
insertComment(comment){
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
updateUser(id, user){
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
updateTicket(id, ticket){
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
updateComment(id, comment){
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
deleteUser(id){
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
deleteTicket(id){
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
deleteComment(id){
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

//DB collection drops//

//Users
dropUsers(){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("users").drop(function(err,res){
            if(err) throw err;
            console.log("Users collection dropped");
        });

        db.close();
    });
}

//Tickets
dropTickets(){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("tickets").drop(function(err,res){
            if(err) throw err;
            console.log("Tickets collection dropped");
        });

        db.close();
    });
}

//Comments
dropComments(){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("comments").drop(function(err,res){
            if(err) throw err;
            console.log("Comments collection dropped");
        });

        db.close();
    });
}

//Comments
dropRoles(){
    client.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("StageTwo");

        dbo.collection("roles").drop(function(err,res){
            if(err) throw err;
            console.log("Roles collection dropped");
        });

        db.close();
    });
}

//database seeder method
seedDatabase(){
    
    //drop pre-existing data
    try{
        this.dropRoles();
        this.dropUsers();
        this.dropTickets();
        this.dropComments();
    }
    catch (error){
        console.log("Unable to drop database");
        console.log(error);
    }

    //users
    try {
        this.insertUser(new User('test', 'test', 1));  
    } 
    catch (error){
        console.log("Unable to seed users");
        console.log(error);
    }

    //tickets
    try {
        this.insertTicket(new Ticket());
    } 
    catch (error){
        console.log("Unable to seed tickets");
        console.log(error);
    }

    //comments
    try {
        this.insertComment(new Comment());
    } 
    catch (error){
        console.log("Unable to seed comments");
        console.log(error);
    }
}

}

//Exports class DBHandler
module.exports = DBHandler;