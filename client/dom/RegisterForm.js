import Phaser from 'phaser';
import serialize from 'form-serialize';
import { HTML } from '../constants';
export class RegisterForm extends Phaser.GameObjects.DOMElement {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.createFromCache(HTML.REGISTER);
		this.scene.add.existing(this);
		this.addListener("submit");
	}
}