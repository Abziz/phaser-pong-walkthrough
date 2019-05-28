import Phaser from 'phaser';
import { MenuButton } from "../gui/MenuButton";
import { LoginForm } from '../dom/LoginForm';
export class MenuLoginScene extends Phaser.Scene {
	constructor() {
		super({ key: "MENU_LOGIN_SCENE_KEY" });
	}

	create() {
		const { centerX, centerY } = this.cameras.main;
		this.loginForm = new LoginForm(this, centerX, 200);
		this.loginForm.onLogin((data) => { this.handleLogin(data) });
		this.backButton = new MenuButton(this, centerX, 200 + this.loginForm.height, "Back", () => { this.scene.start("MENU_SCENE_KEY") });
	}
	update() {

	}
	handleLogin(data) {
		console.log(data);
	}

}