import Phaser from 'phaser';

export class Ball extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key)
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setBounce(1);
		this.setScale(0.05)
		this.play("BALL_ANIMATION");
		this.reset();
	}
	reset() {
		const { centerX, centerY } = this.scene.cameras.main;
		this.setPosition(centerX, centerY);
		this.body.setVelocity(0, 0);
		this.body.setAngularVelocity(40);
		this.isMoving = false;
	}

	start() {
		var side = Math.random() < 0.5 ? 1 : -1;
		var angle = Phaser.Math.FloatBetween(-Math.PI / 4, Math.PI / 4);
		var velocity = 200;
		this.body.setVelocity(side * velocity * Math.cos(angle), side * velocity * Math.sin(angle));
		this.isMoving = true;
	}
}