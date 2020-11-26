const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:2800/StageTwo";

class DBHandler{

createDB(){
    client.connect(url, function (err, db) 
    {
        try{
            console.log("Database created!");
            db.close();
        }
        catch{
            console.log("Database Failed " + err);
        }
    });
}

dropDB(){
    client.connect(url, function (err, db) 
    {
        try{
            console.log("Database dropped!");
            db.close();
        }
        catch{
            console.log("Database Failed " + err);
        }
    });
}

}

module.exports = DBHandler;