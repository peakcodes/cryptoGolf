var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var PORT = process.env.PORT || 3000;

// boilerplate bodyparser setup
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// requiring function and passing app through as an argumentter
require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);


app.listen(PORT, function(){
    console.log('App is lstening on port: ' + PORT)
})