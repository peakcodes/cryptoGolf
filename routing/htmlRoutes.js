var path = require('path');

module.exports = function(app){
    // get request handler for root - serves up index.html from the public directory
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../index.html'))
        // res.sendFile(path.join(__dirname, './style.css'))
    });
    // get request handler for /game - serves up index.html from the public directory
    app.get('/golf', function(req, res){
        res.sendFile(path.join(__dirname, '/../public/golftest.html'))
    })
    app.get('/index', function(req, res){
        res.sendFile(path.join(__dirname, '/index.html'))
    })
}
