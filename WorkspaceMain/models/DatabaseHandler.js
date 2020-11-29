//Daniel Russell
//MongoDB Server may be required with Driver.

//constants
const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/StageTwo";

//DBHandler class definition
class DBHandler{

//DB Creation and Drop//
/* createDB(){
    client.connect(url, function (err, db) 
    {
        if(err) throw err;
        console.log("Database created!");
        db.close();
    });
} */

/* dropDB(){
    client.connect(url, function (err, db) 
    {
        if(err) throw err;
        console.log("Database dropped!");
        db.close();
    });
} */

//DB inserts//

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

}

//Exports class DBHandler
module.exports = DBHandler;