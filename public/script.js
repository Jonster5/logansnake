const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = 420;
canvas.height = 420;

let head = { x: 0, y: 0, vx: 0, vy: 0 };
let tail = [];
let apple = {
	x: Math.floor(Math.random() * 21) * 20,
	y: Math.floor(Math.random() * 21) * 20
};

window.addEventListener("keydown", (event) => {
	if (event.key === 'w' && head.vy !== 20) {
		head.vy = -20;
		head.vx = 0;
	}
	if (event.key === 's' && head.vy !== -20) {
		head.vy = 20;
		head.vx = 0;
	}
	if (event.key === 'a' && head.vx !== 20) {
		head.vy = 0;
		head.vx = -20;
	}
	if (event.key === 'd' && head.vx !== -20) {
		head.vy = 0;
		head.vx = 20;
	}
});

let interval = setInterval(gameloop, 100);

function gameloop() {
	ctx.clearRect(0, 0, 420, 420);

	ctx.fillStyle = "green";

	for (let i of tail) {
		ctx.fillRect(i.x, i.y, 20, 20);
	}

	ctx.fillRect(head.x, head.y, 20, 20);

	ctx.fillStyle = "red";
	ctx.fillRect(apple.x, apple.y, 20, 20);

	ctx.font = "20px courier new";
	ctx.fillStyle = "black";
	ctx.fillText(`score: ${tail.length}`, 150, 15);

	tail.push({ x: head.x, y: head.y });


	head.x += head.vx;
	head.y += head.vy;

	if (head.x !== apple.x || head.y !== apple.y) {
		tail.shift();
	} else {
		let tempX;
		let tempY;

		for (let i of tail) {
			let j = Math.floor(Math.random() * 21) * 20;
			if (i.x !== j) tempX = j;
		}
		for (let i of tail) {
			let j = Math.floor(Math.random() * 21) * 20;
			if (i.y !== j) tempY = j;
		}

		apple = {
			x: tempX,
			y: tempY
		};
	}

	for (let i of tail) {
		if (i.x === head.x && i.y === head.y) {
			kill();
		}
	}

	if (head.x >= canvas.width || head.y >= canvas.height || head.x < 0 || head.y < 0) {
		kill();
	}
}

function kill() {
	clearInterval(interval);

	head.vx = 0;
	head.vy = 0;
	tail = [];

	ctx.clearRect(0, 0, 420, 420);
	ctx.font = "20px courier new";
	ctx.fillStyle = "black";
	ctx.fillText('You Died!', 150, 200);
}

/* create variables */
// some way of storing the data for the snake
// score
// some way of storing the data for the apple

/* event listeners */
// key inputs

/* game loop */
// render everything
// update the positions of everything
// collision detection

/* after the gameloop runs */
//do stuff