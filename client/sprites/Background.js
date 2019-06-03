import Phaser from 'phaser';
import { SPRITES } from '../constants';

export class Background extends Phaser.GameObjects.Sprite {
	constructor({ scene, x = 0, y = 0 }) {
		super(scene, x, y, SPRITES.BACKGROUND);
		this.setDepth(-1);
		this.setOrigin(0, 0);
		this.setScale(0.6)
		this.scene.add.existing(this);
	}
}