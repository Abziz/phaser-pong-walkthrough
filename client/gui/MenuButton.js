export class MenuButton extends Phaser.GameObjects.Container {
	constructor(scene, x, y, text, callback) {
		super(scene, null);
		this.callback = callback;
		this.shape = this.scene.add.rectangle(x, y, 200, 50, 0xff0000, 1);
		this.shape.setOrigin(0.5, 0.5);
		this.text = this.scene.add.text(x, y, text, { fill: "#fff" }, 1);
		this.text.setOrigin(0.5, 0.5);
		this.add(this.shape);
		this.add(this.text);
		this.scene.add.existing(this);
		this.shape.setInteractive({ useHandCursor: true });

		this.reset();
		this.shape.on("pointerout", () => { this.reset() })
		this.shape.on("pointerover", () => { this.hover() });
		this.shape.on("pointerdown", () => { this.click() });
		this.shape.on("pointerup", () => { this.hover() })

	}
	reset() {
		this.shape.setAlpha(0.75);
		this.shape.setScale(0.9);
		this.text.setFontSize(16);
		this.text.setFontStyle("bold");
	}
	hover() {
		this.shape.setAlpha(1);
		this.shape.setScale(1);
		this.text.setFontSize(18);
	}
	click() {
		this.reset();
		this.callback();
	}

} 