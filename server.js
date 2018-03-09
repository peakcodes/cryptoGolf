var express = require('express');
var bodyParser = require('body-parser');
var Matter = require('matter-js');
var path= require('path');
var fs = require('fs');
var app = express();

var PORT = process.env.PORT || 3001;

// boilerplate bodyparser setup
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
// requiring function and passing app through as an argumentter
require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);


app.listen(PORT, function(){
    console.log('App is lstening on port: ' + PORT)  // res.sendFile(path.join(__dirname, './style.css'))
})
