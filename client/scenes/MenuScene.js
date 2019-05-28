import Phaser from "phaser";
import { MenuButton } from "../gui/MenuButton";
export class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: "MENU_SCENE_KEY" });
	}
	init({ isLoggedIn = false, user = null }) {
		this.isLoggedIn = isLoggedIn;
	}
	create() {
		const { centerX, centerY } = this.cameras.main;
		let pos = 0;
		if (!this.isLoggedIn) {
			this.LoginButton = new MenuButton(this, centerX, pos += 50, "Login", () => { this.scene.start("MENU_LOGIN_SCENE_KEY"); });
			this.RegisterButton = new MenuButton(this, centerX, pos += 50, "Register", () => { this.scene.start("MENU_REGISTER_SCENE_KEY"); })
		}
		else {
			this.playButton = new MenuButton(this, centerX, pos += 50, "Play", () => { this.scene.start("MAIN_SCENE_KEY"); });
		}
	}
	update() {

	}
}