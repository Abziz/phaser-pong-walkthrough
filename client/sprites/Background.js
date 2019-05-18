import Phaser from 'phaser';

export class Background extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, 0, 0, config.key);
		this.setDepth(-1);
		this.setOrigin(0, 0);
		this.setScale(0.6)
		this.scene.add.existing(this);
	}
}