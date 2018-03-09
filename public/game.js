// 'use strict';

const coins = ["BTCUSD", "LTCUSD", "ETHUSD", "XMRUSD", "LTCBTC", "ETHBTC", "XMRBTC"];
const tFrame = ["1m", "1h", "1D"];
let coin = null;
let points = [];

const getCoin = () => {
	document.getElementById("btc").addEventListener("click", () => {
		return coin = coins[0];
	});
	document.getElementById("ltc").addEventListener("click", () => {
		return coin = coins[1];
	});
	document.getElementById("eth").addEventListener("click", () => {
		return coin = coins[2];
	});
	document.getElementById("startBtn").addEventListener("click", () => {
		let ui = document.getElementById("ui");
		ui.style.display = "none";
		golf();

	});
}

const golf = async () => {
	
	// constants
    const WORLDWIDTH = 1200;     // Width of the rendered world (800 is default)
    const WORLDHEIGHT = 600;    // Height of the rendered world (600 is default)
    const SCALING = 400;        // Setting the max height of the data

	// module aliases
	const Engine = Matter.Engine,
		Render = Matter.Render,
		World = Matter.World,
		Constraint = Matter.Constraint,
		Mouse = Matter.Mouse,
		MouseConstraint = Matter.MouseConstraint,
		Composite = Matter.Composite,
		Composites = Matter.Composites,
		Body = Matter.Body,
		Bodies = Matter.Bodies,
		Vector = Matter.Vector,
		Vertices = Matter.Vertices,
		Events = Matter.Events;

	// create an engine
	const engine = Engine.create();
	// THIS RENDERS OUR CANVAS
	const render = Render.create({
		element: document.body,
		engine: engine,
		options: { 
			width: WORLDWIDTH,
			height: WORLDHEIGHT
		}
	});

	const pullCandleClose = async () => {

		let queryURL = "https://api.bitfinex.com/v2/candles/trade:1D:tLTCUSD/hist";
		let response = await fetch(queryURL);
		let graphData = await response.json();

		for (let i = 0; i < 30; i++) {
			points.push(Math.floor(graphData[i][2]));
		}
		return points;
	}

	let path = await pullCandleClose();
	let chartPoints = path.reverse();
	console.log(chartPoints);
	console.log(path);

	//TODO FIX MIN AND MAX VALUES
	// let minValue = Math.min(chartPoints);
	// console.log(minValue);
	// // console.log(chartPoints);
	// // console.log(minValue);
	// // for (var i = 0; i < chartPoints.length; i++) {
	// //   chartPoints[i] = chartPoints[i] - minValue;
	// // }
	// let maxValue = Math.max(chartPoints[0]);

	// change the range of data to the difference between the highest and lowest point
var minValue = Math.min(...chartPoints);
console.log(minValue);
// for (var i = 0; i < chartPoints.length; i++) {
//     chartPoints[i] = chartPoints[i] - minValue;
// }
console.log(chartPoints);

// create an array of lines to simulate a data chart as a golf course and some padding under chart so ball won't slide through
var maxValue = Math.max(...chartPoints);
	var lines = [];
	var paddingLines = [];

	// Terrain
	//REVIEW WILL RENDER
	// create an array of lines to simulate a data chart as a golf course and some padding under chart so ball won't slide through


for (var i = 0; i < chartPoints.length-1; i++) {
    var x = (i + (i + 1))/2 * WORLDWIDTH/chartPoints.length;    //scale plot to span the length of the world
    var y = WORLDHEIGHT+100 - ((chartPoints[i] + chartPoints[i+1])/2 * (SCALING/maxValue)); //scaling to fit area and flip data upside down to follow coordinates

    var adjacent = 1 * WORLDWIDTH/chartPoints.length;
    var opposite = (chartPoints[i+1] - chartPoints[i]) * (SCALING/maxValue);
    var angle = Math.atan(opposite / adjacent);
    
    var line = Bodies.rectangle(x, y, Math.sqrt(opposite**2 + adjacent**2), 1, { isStatic: true, angle: -angle }); // negative angle to compensate for flipped data
    var invisibleLine = Bodies.rectangle(x, y+5, Math.sqrt(opposite**2 + adjacent**2), 10, { isStatic: true, angle: -angle, render: {visible: false}});
    lines.push(line);
    paddingLines.push(invisibleLine);
}
World.add(engine.world, lines);
World.add(engine.world, paddingLines);
console.log(lines);

// find highest points of beginning and end of data
var maxBegin = WORLDHEIGHT;
var maxEnd = WORLDHEIGHT;
for (var i = 0; i < 5; i++) {
    if (maxBegin > WORLDHEIGHT - chartPoints[i]*SCALING/maxValue){
        maxBegin = WORLDHEIGHT - chartPoints[i]*SCALING/maxValue;
    }
    if (maxEnd > WORLDHEIGHT - chartPoints[chartPoints.length - i - 1]*SCALING/maxValue){
        maxEnd = WORLDHEIGHT - chartPoints[chartPoints.length - i - 1]*SCALING/maxValue;
    }
}

// create the golf ball slingshot
var golfBallSize = 7;
var golfBall = Bodies.circle(100, maxBegin - 100, golfBallSize);
var slingshot = Constraint.create({
    pointA: {x: 100, y: maxBegin - 100},
    bodyB: golfBall,
    stiffness: 0.05
})

var score = 0;
Events.on(engine, "afterUpdate", function() {
    if (mConstraint.mouse.button === -1 && (Math.abs(golfBall.position.x - slingshot.pointA.x) > 20 || Math.abs(golfBall.position.y - slingshot.pointA.y) > 20)) {
        golfBall = Bodies.circle(100, maxBegin - 100, golfBallSize);
        World.add(engine.world, golfBall);
        slingshot.bodyB = golfBall;
        score += 1;
    }
})

// create sensor hole
var winner = false;
var holeSize = 50;
var halfHoleSize = holeSize/2;
var sensorHole = Bodies.rectangle((WORLDWIDTH-100), maxEnd-25, holeSize, 5, {isStatic: true});
var sensorWall1 = Bodies.rectangle((WORLDWIDTH-100)-halfHoleSize-halfHoleSize*Math.sin(Math.PI/4), maxEnd-25-halfHoleSize*Math.sin(Math.PI/4), 5, holeSize, {isStatic: true, angle: -Math.PI/4});
var sensorWall2 = Bodies.rectangle((WORLDWIDTH-100)+halfHoleSize+halfHoleSize*Math.sin(Math.PI/4), maxEnd-25-halfHoleSize*Math.sin(Math.PI/4), 5, holeSize, {isStatic: true, angle: Math.PI/4});

// create padding for hole
var paddingHole = Bodies.rectangle((WORLDWIDTH-100), maxEnd-25+7.5, holeSize, 10, {isStatic: true, render: {visible: false}});
var paddingWall1 = Bodies.rectangle((WORLDWIDTH-100)-halfHoleSize-halfHoleSize*Math.sin(Math.PI/4), maxEnd-25-halfHoleSize*Math.sin(Math.PI/4)+7.5, 10, holeSize, {isStatic: true, angle: -Math.PI/4, render: {visible: false}});
var paddingWall2 = Bodies.rectangle((WORLDWIDTH-100)+halfHoleSize+halfHoleSize*Math.sin(Math.PI/4), maxEnd-25-halfHoleSize*Math.sin(Math.PI/4)+7.5, 10, holeSize, {isStatic: true, angle: Math.PI/4, render: {visible: false}});

Events.on(engine, "collisionStart", function(event) {
    var pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if ((pair.bodyA === sensorHole || pair.bodyB === sensorHole) && winner == false) {
            alert("You Win! Score: " + score);
            winner = true;
        }
    }
})

// create a mouse constraint
var mouse = Mouse.create(render.canvas)
var options = {mouse: mouse};
var mConstraint = MouseConstraint.create(engine, options);

World.add(engine.world, [golfBall, slingshot, sensorHole, sensorWall1, sensorWall2]);
World.add(engine.world, [paddingHole, paddingWall1, paddingWall2]);
World.add(engine.world, mConstraint);



// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
}
