"use strict";

const game_width = 64 * 12;
const game_height = 64 * 21;

let gameData = {};
let se = [];

function Random(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const config = {
	type: Phaser.AUTO,
	parent: "canvas",
	width: game_width,
	height: game_height,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
	},
	pixelArt: false,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [LogoScene, LoadScene, StartScene, GameScene],
};

let game = new Phaser.Game(config);
