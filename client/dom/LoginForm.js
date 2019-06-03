import Phaser from 'phaser';
import serialize from 'form-serialize';
import { HTML } from '../constants';
export class LoginForm extends Phaser.GameObjects.DOMElement {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.createFromCache(HTML.LOGIN);
		this.scene.add.existing(this);
		this.addListener("submit");
	}
}