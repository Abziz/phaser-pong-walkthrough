import Phaser from 'phaser';
import { SPRITES } from '../constants';

export class Paddle extends Phaser.GameObjects.Sprite {
	constructor({ scene, x, y }) {
		super(scene, x, y, SPRITES.PADDLE)
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setImmovable(true);
		this.setOrigin(0, 0.5)
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