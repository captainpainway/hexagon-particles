var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var particles = [];

function beginParticles () {
	for (var i = 0; i < 200; i++) {
		setTimeout(Particle, 50 * i);
	}
}

function Particle(i) {
	var x = Math.random() * width;
	var y = Math.random() * height;
	var size = 40 * Math.random();
	var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	opacity = 0.9 + Math.random() / 2;
	var p = new eachParticle(x, y, size, color, opacity);
	particles.push(p);
}

function eachParticle(x, y, size, color, opacity) {

	function reset() {
		var x = Math.random() * width;
		var y = Math.random() * height;
		opacity = 0.6 + Math.random() / 5;
	}

	this.update = function() {
		if (opacity - 0.01 > 0) opacity -= 0.01;
		else reset();
	}

	this.draw = function() {
		ctx.globalAlpha = opacity;
		ctx.strokeStyle = color;
		ctx.shadowBlur = 10;
		ctx.shadowColor = color;
		ctx.lineWidth = 1;

		ctx.beginPath();
		
		for (var i = 1; i <= 7; i++) {
			ctx.lineTo (x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
		}

		ctx.stroke();
	}
}

function render() {
	ctx.clearRect (0, 0, width, height);
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
	}
	requestAnimationFrame(render);
}

beginParticles();
render();