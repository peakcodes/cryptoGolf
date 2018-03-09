'use strict';

function setup() {
	const cnv = createCanvas(1200, 800);
	const x = (windowWidth - width) / 2;
	const y = (windowHeight - height) / 2;
	cnv.position(x, y);
	background(200);
}

function draw() {

	fill(0, 255, 68); // start color
	if (mouseIsPressed && mouseX >= 50 && mouseX <= 300 && mouseY <= 250 && mouseY >= 150) {
		fill(33, 112, 52); // click color
	}
	rect(50, 150, 250, 100); // the button
	rect(100, 250, 350, 200); // the button

	// The button text
	fill(0, 0, 0);
	textSize(30);
	text("PRESS ME!", 93, 193);
}

function AddBox(x, y, w, h) { // Ex. Constructor

	this.body = rect(x, y, w, h, options) // See matter.js docs for more bodies
	this.w = w;
	this.h = h;
	this.houdini = () => {
		let pos = this.body.position;
		let angle = this.body.angle;
		World.add(world, this.body);
		return (pos.y > height + 50);
	}

}
// if (mouseIsPressed) {
// 			rect(350, 650, 850, 750);
// 		fill(0);
// }
	let initUI = () => {
		rectMode(CORNERS); // Set rectMode to CORNERS
		fill(100); // Set fill to gray
		rect(100, 200, 200, 300); //BOX 1
	rect(200, 200, 300, 300);
	rect(300, 200, 400, 300);
	rect(400, 200, 500, 300);
	rect(500, 200, 600, 300);
	rect(600, 200, 700, 300);
	rect(700, 200, 800, 300);
	rect(800, 200, 900, 300);
	rect(900, 200, 1000, 300);
	rect(1000, 200, 1100, 300);

	// rect(400, 225, 750, 575);
	rect(350, 650, 850, 750);

};
initUI();
}
