import Phaser from 'phaser';

export class Button extends Phaser.GameObjects.DOMElement {
	constructor(scene, x, y, text) {
		super(scene, x, y, 'button');
		scene.add.existing(this);
		this.node.textContent = text;
		this.addListener("click");
	}
}