import Phaser from 'phaser';
import { Paddle } from '../sprites/Paddle';
import { Ball } from '../sprites/Ball';
import { Background } from '../sprites/Background';
import { SCENES, CONFIG } from '../constants';
import { socket } from '../socket';
export class GameScene extends Phaser.Scene {

	constructor() {
		super({ key: SCENES.GAME });
		socket.on("ready", (data) => this.onSocketReady(data));
		socket.on("update-paddle", (data) => this.onSocketUpdatePaddle(data));
		socket.on("ball-update", (data) => this.onSocketBallUpdate(data));
		socket.on("game-start", (data) => this.onSocketGameStart(data));
	}
	init(user) {
		this.user = user;
		socket.emit("join-game");
	}

	create() {
		this.physics.world.setBoundsCollision(true, true, true, true);
		this.leftPaddle = new Paddle({ scene: this, x: 0, y: CONFIG.HEIGHT / 2 }).setOrigin(0, 0.5);
		this.rightPaddle = new Paddle({ scene: this, x: CONFIG.WIDTH, y: CONFIG.HEIGHT / 2 }).setOrigin(1, 0.5);
		this.ball = new Ball({ scene: this, x: CONFIG.WIDTH / 2, y: CONFIG.HEIGHT / 2, });
		this.background = new Background({ scene: this })
		//what happens when ball touches paddles
		this.physics.add.collider(this.ball, [this.rightPaddle, this.leftPaddle], function (paddle, ball) {
		}, null, this);
		this.keys = {
			rightPaddle: {
				up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
				down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
			},
			leftPaddle: {
				up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
				down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
			},
			start: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			pause: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
		};

	}
	update() {
		if (this.room) {
			this.myPaddle.update(this.keys.leftPaddle);
			this.sendPaddleData();
		}
		if (this.ball.isMoving) {
			this.sendBallData();
		}
	}
	onSocketReady(room) {
		if (room.player1 == socket.id) {
			this.myPaddle = this.leftPaddle;
			this.otherPaddle = this.rightPaddle;
		} else {
			this.myPaddle = this.rightPaddle;
			this.otherPaddle = this.leftPaddle;
		}
		this.room = room;
	}
	sendBallData() {
		socket.emit("ball-update", {
			x: this.ball.x,
			y: this.ball.y,
			vx: this.ball.body.velocity.x,
			vy: this.ball.body.velocity.y,
			a: this.ball.angle
		})
	}
	sendPaddleData() {
		socket.emit("update-paddle", this.myPaddle.y);
	}
	onSocketUpdatePaddle(paddleY) {
		this.otherPaddle.setY(paddleY);
	}
	onSocketGameStart(velocityX, velocityY) {
		this.ball.body.setVelocity(velocityX, velocityY);
		this.ball.isMoving = true;
	}
	onSocketBallUpdate({ x, y, vx, vy, a }) {
		this.ball.setX(x);
		this.ball.setY(y);
		this.ball.body.setVelocity(vx, vy);
		this.ball.setAngle(a);
	}
}