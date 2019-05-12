import Phaser from 'phaser';
const config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	parent: 'body',
	scene: { preload, create, update },
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	}
};

var game = new Phaser.Game(config);

const SPEED = 200;
function preload() {
	this.load.image("paddle", "assets/paddle.png");
	this.load.spritesheet("ball", "assets/ball.png", { frameWidth: 695, frameHeight: 673 })
}
var leftPaddle;
var rightPaddle;
var ball;
function create() {
	//allow ball to go outside world from left and right
	this.physics.world.setBoundsCollision(false, false, true, true);
	// create ball animation
	this.anims.create({
		key: 'shine',
		frames: this.anims.generateFrameNumbers('ball', { frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3] }),
		frameRate: 15,
		yoyo: false,
		repeat: -1
	});
	// add left paddle
	leftPaddle = this.physics.add.image(0, this.cameras.main.centerY, "paddle");
	leftPaddle.body.setCollideWorldBounds(true);
	leftPaddle.setImmovable()
	//add right paddle
	rightPaddle = this.physics.add.image(this.game.config.width, this.cameras.main.centerY, "paddle");
	rightPaddle.body.setCollideWorldBounds(true);
	rightPaddle.setImmovable();
	//add ball
	ball = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "ball", 0)
	ball.play("shine"); // play the animation
	ball.setScale(0.075)
	ball.setCollideWorldBounds(true, 1, 1);
	//random direction left /right
	const direction = Math.random() < 0.5 ? 1 : -1;
	ball.setVelocity(SPEED * direction, SPEED * direction);
	ball.setAngularVelocity(SPEED);

	//what happens when ball touches paddles
	this.physics.add.collider(leftPaddle, ball, function (paddle, ball) {
		ball.setVelocityX(SPEED)
	}, null, this);
	this.physics.add.collider(rightPaddle, ball, function (paddle, ball) {
		ball.setVelocityX(-SPEED)
	}, null, this);

	//  move paddles with mouse
	this.input.on('pointermove', function (pointer) {
		leftPaddle.setY(pointer.y);
		rightPaddle.setY(pointer.y);
	}, this);
}

function update() {
	if (ball.x < 0) {
		console.log("left win");
		ball.setX(this.cameras.main.centerX)
		ball.setY(this.cameras.main.centerY)
		ball.setVelocity(200);
	}
	if (ball.x > 800) {
		console.log("right win");
		ball.setX(this.cameras.main.centerX)
		ball.setY(this.cameras.main.centerY)
		ball.setVelocity(200);
	}

}

