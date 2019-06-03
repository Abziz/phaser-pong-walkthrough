import Phaser, { DOM } from 'phaser';
import { SCENES, SPRITES, HTML } from '../constants';

export class BootScene extends Phaser.Scene {

	constructor() {
		super({ key: SCENES.BOOT });
	}

	init(data) {

	}

	preload() {
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;

		this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', { font: '20px monospace', fill: '#ffffff' });
		this.loadingText.setOrigin(0.5, 0.5);
		this.percentText = this.add.text(width / 2, height / 2, "0%", { font: '18px monospace', fill: '#ffffff' });
		this.percentText.setOrigin(0.5, 0.5);
		this.load.on('progress', (value) => {
			this.percentText.setText(parseInt(value * 100) + '%');
		});
		this.load.on('fileprogress', function (file) {
			console.log('Loading asset: ' + file.key);
		});
		this.load.on('complete', () => {
			console.log("done");
		});

		this.load.image(SPRITES.PADDLE, "assets/paddle.png");
		this.load.image(SPRITES.BACKGROUND, "assets/background.png")
		this.load.spritesheet(SPRITES.BALL, "assets/ball.png", { frameWidth: 695, frameHeight: 673 })
		this.load.html(HTML.REGISTER, "/assets/dom/register-form.html");
		this.load.html(HTML.LOGIN, "/assets/dom/login-form.html");
	}
	create() {
		this.scene.start(SCENES.MENU);
	}
}
