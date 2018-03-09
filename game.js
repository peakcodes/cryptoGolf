'use strict';

const golf = async () => {

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
		Vertices = Matter.Vertices;

	// create an engine
	const engine = Engine.create();
<<<<<<< HEAD
	// THIS RENDERS OUR CANVAS
	const render = Render.create({
		width: 1200,
		height: 800,
=======
	// create a renderer
	const render = Render.create({
>>>>>>> 69f58a275f9945696c5cf0dcd3e501dbf0a495ef
		element: document.body,
		engine: engine
	});

<<<<<<< HEAD
	const coins = ["BTCUSD", "LTCUSD", "ETHUSD", "XMRUSD", "LTCBTC", "ETHBTC", "XMRBTC"];
=======
	const coins = ["BTC/USD", "LTC/USD", "ETH/USD", "XMR/USD", "LTC/BTC", "ETH/BTC", "XMR/BTC"];
>>>>>>> 69f58a275f9945696c5cf0dcd3e501dbf0a495ef
	const tFrame = ["1m", "1h", "1D"];
	let points = [];

	const pullCandleClose = async () => {

<<<<<<< HEAD
		let queryURL = "https://api.bitfinex.com/v2/candles/trade:1M:tBTCUSD/hist";
		let coin = '';
		let response = await fetch(queryURL);
		let graphData = await response.json();
=======
		let queryURL = "https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist";
		let coin = '';
		let response = await fetch(queryURL);
		// console.log(response);
		let graphData = await response.json();
		// console.log(htmlString);      var points = [];
>>>>>>> 69f58a275f9945696c5cf0dcd3e501dbf0a495ef

		for (let i = 0; i < 30; i++) {
			points.push(Math.floor(graphData[i][2]));
		}
		return points;
	}

	let path = await pullCandleClose();

<<<<<<< HEAD
	//TODO FIX MIN AND MAX VALUES
	let minValue = Math.min(path);
	// console.log(path);
=======
  //TODO FIX MIN AND MAX VALUES
	let minValue = Math.min(path);
  // console.log(path);
>>>>>>> 69f58a275f9945696c5cf0dcd3e501dbf0a495ef
	// console.log(minValue);
	// for (var i = 0; i < path.length; i++) {
	//   path[i] = path[i] - minValue;
	// }
	let maxValue = Math.max(path[0]);
	var lines = [];

<<<<<<< HEAD
	// Terrain
	//REVIEW WILL RENDER
	for (let i = 0; i < path.length - 1; i++) {
		let x = (i + (i + 1)) / 2 * 30; //*5 only used to span graph
		let y = 600 - ((path[i] + path[i + 1]) / 2 * (350 / maxValue)); //scaling to fit area
=======
// Terrain
//REVIEW WILL RENDE
	for (let i = 0; i < path.length - 1; i++) {
		let x = (i + (i + 1)) / 2 * 30; //*5 only used to span graph
		let y = 750 - ((path[i] + path[i + 1]) / 2 * (350 / maxValue)); //scaling to fit area
>>>>>>> 69f58a275f9945696c5cf0dcd3e501dbf0a495ef
		// console.log(y);
		let adjacent = 1 * 30;
		let opposite = (path[i + 1] - path[i]) * (350 / maxValue);
		let angle = Math.atan(opposite / adjacent);
		// console.log(angle);
		let line = Bodies.rectangle(x, y, Math.sqrt(opposite ** 2 + adjacent ** 2), 1, {
			isStatic: true,
			angle: -angle
		});
		// World.add(engine.world, line);
		lines.push(line);
	}


	let ball = Bodies.circle(40, 20, 30);
	// console.log(course);
	// console.log("this");
<<<<<<< HEAD
	World.add(engine.world, lines);
=======
  World.add(engine.world, lines);
>>>>>>> 69f58a275f9945696c5cf0dcd3e501dbf0a495ef
	World.add(engine.world, ball);
	// run the engine
	Engine.run(engine);
	// run the renderer
	Render.run(render);
};
golf();
