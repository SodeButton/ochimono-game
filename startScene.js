"use strict";
class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: "startScene" });
	}

	preload() {}

	create() {
		this.title = this.add.text(game_width / 2, game_height / 4, "落ち物ゲーム", {
			fontSize: "60px",
			fontFamily: "pixel",
			color: "#ffffff",
			padding: { left: 0, right: 0, bottom: 0, top: 4 },
		});
		this.title.setOrigin(0.5, 0.5);

		this.tapText = this.add.text(game_width / 2, game_height * 0.7, "スタート", {
			fontSize: "30px",
			fontFamily: "pixel",
			color: "#ffffff",
			padding: { left: 0, right: 0, bottom: 0, top: 4 },
		});
		this.tapText.setOrigin(0.5, 0.5);

		this.versionText = this.add.text(30, game_height - 10, "Ver α0.0.1", {
			fontSize: "30px",
			fontFamily: "pixel",
			color: "#ffffff",
			padding: { left: 0, right: 0, bottom: 0, top: 4 },
		});
		this.versionText.setOrigin(0, 1);

		this.copyrightText = this.add.text(game_width - 30, game_height - 10, "(c)2022 Button", {
			fontSize: "30px",
			fontFamily: "pixel",
			color: "#ffffff",
			padding: { left: 0, right: 0, bottom: 0, top: 4 },
		});
		this.copyrightText.setOrigin(1, 1);

		this.isClick = false;
		this.input.once(
			"pointerdown",
			function () {
				this.fade = new Fade(this, 0);
				this.isClick = true;
			},
			this
		);
	}

	update(time, delta) {
		this.title.updateText();
		this.tapText.updateText();
		this.versionText.updateText();
		this.copyrightText.updateText();

		if (this.isClick && this.fade.isComplete) {
			this.scene.start("gameScene");
		}
	}
}