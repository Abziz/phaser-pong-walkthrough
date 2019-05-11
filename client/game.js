const config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	parent: 'body',
	scene: {
		preload: function () {

		},
		create: function () {

		},
		update: function () {

		}
	},
	physics: {
		default: 'arcade'
	}
};

new Phaser.Game(config);