import Phaser from "phaser";
import { PrettyButton } from '../utils/PrettyButton';
export class MainMenuScene extends Phaser.Scene {
	constructor() {
		super("MAIN_MENU_SCENE_KEY");
	}

	create() {
		this.titleText = null;
		this.LoginButton = new PrettyButton(this, this.cameras.main.centerX, 50, "LOGIN", () => { console.log("login") });
		this.RegisterButton = new PrettyButton(this, this.cameras.main.centerX, 50 * 2, "REGISTER", () => { console.log("register") });
		this.highScoresButton = new PrettyButton(this, this.cameras.main.centerX, 50 * 3, "HIGH SCORES", () => { console.log("high scores") });
		this.playButton = new PrettyButton(this, this.cameras.main.centerX, 50 * 4, "PLAY", () => { this.scene.start("MAIN_SCENE_KEY"); });
	}
}
