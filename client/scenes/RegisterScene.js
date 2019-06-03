import Phaser from 'phaser';
import { MenuButton } from "../gui/MenuButton";
import { RegisterForm } from '../dom/RegisterForm';
import { SCENES } from '../constants';
import serialize from 'form-serialize';
import { socket } from '../socket';
export class RegisterScene extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.REGISTER });
		socket.on("register-success", (data) => { this.onRegisterSuccess(data); });
		socket.on("register-failed", console.error);
	}

	create() {
		const { centerX, centerY } = this.cameras.main;

		this.registerForm = new RegisterForm(this, centerX, 200);
		this.registerForm.on("submit", this.onRegisterSubmit);
		this.backButton = new MenuButton(this, centerX, 200 + this.registerForm.height, "Back", () => { this.scene.start(SCENES.MENU) });
	}
	update() {

	}
	onRegisterSubmit(e) {
		e.preventDefault();
		const data = serialize(e.target, { hash: true });
		socket.emit("register", data);
	}

	onRegisterSuccess(data) {
		this.scene.start(SCENES.MENU);
	}
}