import Phaser from 'phaser';

export class Paddle extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key)
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setImmovable(true);
	}
	update(keys) {
		if (keys.up.isDown) {
			this.body.setVelocityY(-200);
		} else if (keys.down.isDown) {
			this.body.setVelocityY(200);
		}
		else {
			this.body.setVelocityY(0);
		}
	}
}