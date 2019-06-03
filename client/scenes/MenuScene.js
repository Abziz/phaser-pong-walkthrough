import Phaser from "phaser";
import { MenuButton } from "../gui/MenuButton";
import { SCENES } from "../constants";
export class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.MENU });
	}
	init({ user }) {
		this.user = user;
	}
	create() {
		const { centerX, centerY } = this.cameras.main;
		let pos = 0;
		if (!this.user) {
			this.LoginButton = new MenuButton(this, centerX, pos += 50, "Login", () => { this.scene.start(SCENES.LOGIN); });
			this.RegisterButton = new MenuButton(this, centerX, pos += 50, "Register", () => { this.scene.start(SCENES.REGISTER); })
		}
		else {
			this.playButton = new MenuButton(this, centerX, pos += 50, "Play", () => {
				console.log(this.user);
				this.scene.start(SCENES.GAME, this.user);
			});
		}
	}
	update() {

	}
}