import Phaser from 'phaser';

export class TextBox extends Phaser.GameObjects.DOMElement {
	constructor(scene, x, y, type = "text", placeholder = "") {
		super(scene, x, y, 'input');
		scene.add.existing(this);
		this.node.setAttribute("type", type);
		this.node.setAttribute("placeholder", placeholder);
		this.setOrigin(0.5, 0.5);

	}
	value() {
		return this.node.value;
	}
}