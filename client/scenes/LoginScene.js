import Phaser from 'phaser';
import { MenuButton } from "../gui/MenuButton";
import { LoginForm } from '../dom/LoginForm';
import { SCENES } from '../constants';
import { socket } from '../socket';
import serialize from 'form-serialize';
export class LoginScene extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.LOGIN });
		socket.on("login-success", (data) => { this.onLoginSuccess(data); });
		socket.on("login-failed", console.error);
	}

	create() {
		const { centerX, centerY } = this.cameras.main;
		this.loginForm = new LoginForm(this, centerX, 200);
		this.loginForm.on("submit", this.onLoginSubmit)
		this.backButton = new MenuButton(this, centerX, 200 + this.loginForm.height, "Back", () => { this.scene.start(SCENES.MENU) });
	}
	update() {

	}
	onLoginSubmit(event) {
		event.preventDefault();
		const data = serialize(event.target, { hash: true });
		socket.emit("login", data);
	}
	onLoginSuccess(user) {
		this.scene.start(SCENES.MENU, { user });
	}
}