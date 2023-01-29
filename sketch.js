var mySize;
var seed = Math.random() * 1000;
var color1, color2;
let colors1 = ["#003844","#006C67","#F194B4","#FFB100","#FFEBC6"];
let colors2 = ["#373F51","#008DD5","#DFBBB1","#F56476","#E43F6F"];
let colors3 = ["#6F2DBD","#A663CC","#B298DC","#B8D0EB","#B9FAF8"];
let colors4 = ["#001514","#C2D076","#FFE1EA","#FFA0FD","#E952DE"];
let colors5 = ["#EEEBD0","#EBB3A9","#E87EA1","#E86252","#EE2677"];
let colorbg = "#BAB700";
let colorbg2 = "#BBDFC5";
let plus;
var t, rez, c, n;

function setup() {
	randomSeed(seed);
	mySize = min(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight);
	background(colorbg);
	t = rez = 0.01;
	color1 = random([colors1, colors2, colors3, colors4, colors5]);
	color2 = random([colors1, colors2, colors3, colors4, colors5]);
	// pixelDensity(5);
	xOff = 0;
	yOff = 0;
	let filter = new makeFilter();
}

function draw() {
	randomSeed(seed);
	background(colorbg2);
	plus = width/15;
	
	for (let i = xOff; i < width - xOff; i += plus) {
		for (let j = yOff; j < height - yOff; j += plus) {
			strokeCap(SQUARE);
			n = noise(i * rez, j * rez + t);
			drawingContext.setLineDash([n * 5, n * 10]);
			if (n > 0.35) {
				//drawingContext.setLineDash([n * 5, 10]);
				noFill();
				stroke(random(color1));
			} else {
				noStroke();
				fill(random(color2));
			}
			
			if (n > 0.5) {
				push();
				translate(i, j);
				strokeWeight(int(random(plus/2*3)));
				circle(0, 0, plus/2);
				// circle(0, 0, plus);
				pop();
			} else {
				push();
				translate(i, j);
				strokeWeight(int(random(plus/2*3)));
				circle(plus, 0, plus/2);
				circle(0, plus, plus/2);
				pop();
			}

		}
	}
	t += 0.005;
	// plus += 0.01;
	image(overAllTexture, 0, 0);
	// if(t==0.03) {noLoop();}
}

function makeFilter() {
	randomSeed(seed);
	// noiseのフィルターをつくる
	colorMode(HSB, 360, 100, 100, 100);
	drawingContext.shadowColor = color(0, 0, 5, 10);
	overAllTexture = createGraphics(windowWidth, windowHeight);
	overAllTexture.loadPixels();
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			overAllTexture.set(
				i,
				j,
				color(210, 18, 12, noise(i / 3, j / 3, (i * j) / 50) * random(1, 15))
			);
		}
	}
	overAllTexture.updatePixels();
}

function keyTyped() {
	if (key === "s" || key === "S") {
		saveCanvas("20211230-Untitled", "png");
	}
}