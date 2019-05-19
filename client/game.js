import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';
import { BootScene } from './scenes/BootScene';
import { MainMenuScene } from './scenes/MainMenuScene';

const config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	parent: 'body',
	scene: [BootScene, MainMenuScene, MainScene],
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	}
};

var game = new Phaser.Game(config);