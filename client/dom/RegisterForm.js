import Phaser from 'phaser';
import serialize from 'form-serialize';
export class RegisterForm extends Phaser.GameObjects.DOMElement {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.createFromCache("REGISTER_FORM_HTML");
		this.scene.add.existing(this);
		this.addListener("submit");
	}

	onRegister(callback) {
		this.on("submit", (e) => {
			e.preventDefault();
			const data = serialize(e.target, { hash: true });
			callback(data);
		})
	}
}