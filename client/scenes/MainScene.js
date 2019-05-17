import Phaser from 'phaser';
import { Paddle } from '../sprites/Paddle';
import { Ball } from '../sprites/Ball';

export class MainScene extends Phaser.Scene {

	constructor() {
		super({ key: "MAIN_SCENE_KEY" });
	}
	init(data) {

	}
	preload() {
		this.load.image("PADDLE_SPRITE", "assets/paddle.png");
		this.load.spritesheet("BALL_SPRITE", "assets/ball.png", { frameWidth: 695, frameHeight: 673 })
	}
	create() {
		this.physics.world.setBoundsCollision(false, false, true, true);
		this.anims.create({
			key: 'BALL_ANIMATION',
			frames: this.anims.generateFrameNumbers('BALL_SPRITE', { frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3] }),
			frameRate: 15,
			yoyo: false,
			repeat: -1
		});
		this.leftPaddle = new Paddle({ scene: this, x: 0, y: 400, key: "PADDLE_SPRITE" });
		this.rightPaddle = new Paddle({ scene: this, x: this.game.config.width, y: 400, key: "PADDLE_SPRITE" });
		this.ball = new Ball({ scene: this, x: this.cameras.main.centerX, y: this.cameras.main.centerY, key: "BALL_SPRITE" });
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
		//console.log(this.ball.angle); 
		this.rightPaddle.update(this.keys.rightPaddle);
		this.leftPaddle.update(this.keys.leftPaddle);
		if (this.keys.start.isDown && !this.ball.isMoving) {
			this.ball.start();
		}
	}
}