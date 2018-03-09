// var points = require('../data/points.js');

module.exports = function(app) {

// handler for get request at this route
app.get('/api/coins', function(req, res){
    res.send(points);
})

app.post('/api/coins', function(req, res){
    var coin = req.body;
    // var score = req.body.score
    points[0].push(coin);
})
}

// front end get request

// var key = hgqtwy67skalm927T;
// $.get('/api/coins/key=' + key, function(response){
//     console.log(response) // points
// })

// $.ajax().then(function(data){


// var coinObj = {
//     user: data.name,
//     score: $('#val'),
//     prevSCores: [],
// }

// $.post('/api/coins', score, function(response){
//     console.log(response);
// })

// });
