import Phaser from 'phaser';
import { MenuButton } from "../gui/MenuButton";
import { RegisterForm } from '../dom/RegisterForm';

export class MenuRegisterScene extends Phaser.Scene {
	constructor() {
		super({ key: "MENU_REGISTER_SCENE_KEY" });
	}

	create() {
		const { centerX, centerY } = this.cameras.main;
		this.registerForm = new RegisterForm(this, centerX, 200);
		this.registerForm.onRegister((data) => { this.handleRegister(data) });
		this.backButton = new MenuButton(this, centerX, 200 + this.registerForm.height, "Back", () => { this.scene.start("MENU_SCENE_KEY") });
	}
	update() {

	}
	handleRegister(data) {
		console.log(data);
	}

}