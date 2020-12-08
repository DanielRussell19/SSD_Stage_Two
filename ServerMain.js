//Daniel Russell
////////////////

//Imports
let http = require('http');
let express = require('express');
let ehandlebars = require('express-handlebars');
let session = require('express-session');
let path = require('path');
let cookieparser = require('cookie-parser');

//Controllers
let maincontroller = require('./WorkspaceMain/controllers/MainController');
let usercontroller = require('./WorkspaceMain/controllers/UserController');
let ticketcontroller = require('./WorkspaceMain/controllers/TicketController');
let commentcontroller = require('./WorkspaceMain/controllers/CommentController');

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

//URL-encoding? to use body-paser for requests?
app.use(express.urlencoded());

//parse JSON bodies as sent by API
app.use(express.json());

//cookie parser
app.use(cookieparser());

//express sessions
app.use(session({secret: "Your secret key"}));
//router settings
app.use('/', usercontroller);
app.use('/', ticketcontroller);
app.use('/', commentcontroller);
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
