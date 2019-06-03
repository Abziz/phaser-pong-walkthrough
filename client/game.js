import Phaser from 'phaser';

import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { LoginScene } from './scenes/LoginScene';
import { RegisterScene } from './scenes/RegisterScene';
import { MenuScene } from './scenes/MenuScene';
import { CONFIG } from './constants';

const config = {
	type: Phaser.CANVAS,
	width: CONFIG.WIDTH,
	height: CONFIG.HEIGHT,
	parent: 'body',
	backgroundColor: "#444",
	scene: [BootScene, GameScene, MenuScene, LoginScene, RegisterScene],
	dom: {
		createContainer: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	}
};
var game = new Phaser.Game(config);