import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {

	constructor() {
		super({ key: "BOOT_SCENE_KEY" });
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

		this.load.image("PADDLE_SPRITE", "assets/paddle.png");
		this.load.spritesheet("BALL_SPRITE", "assets/ball.png", { frameWidth: 695, frameHeight: 673 })
		this.load.image("BACKGROUND_SPRITE", "assets/background.png")
		/**
		 * loading may happen too fast, because we have only a few assets.
		 * uncomment this for loop to see how it would act if we had more.
		 */
		for (let i = 0; i < 100; i++) {
			this.load.image(`BACKGROUND_SPRITE_${i}`, "assets/background.png");
		}
	}
	create() {
		this.scene.start("MAIN_SCENE_KEY", { msg: "assets are ready" });

	}
}
