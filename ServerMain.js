//Daniel Russell
////////////////

//Imports
let http = require('http');
let express = require('express');
let ehandlebars = require('express-handlebars');
let path = require('path');

//Controllers
let maincontroller = require('./WorkspaceMain/controllers/MainController');

//Express set-up
var app = express();
app.engine('hbs', ehandlebars({extname: 'hbs'}));

//Express properties
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname,'./WorkspaceMain/views'));
app.set('port', process.env.PORT || 2000);

//static path to access assets such as images, css, etc.
const staticpath = path.join(__dirname, './WorkspaceMain/views');
app.use(express.static(staticpath));

//router settings
app.use('/', maincontroller);

//Error
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send("Error, 404, Resource not found.");
});

//Port listener
app.listen(app.get('port'), function(){
    console.log("CTRL-C to close server.");
});
