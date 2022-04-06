"use strict";

let nowScene;

class Block {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	draw() {
		let s = 64;
		nowScene.add.graphics().fillStyle(0xffffff)
			.fillRect(this.x * s + 2, this.y * s + 2, s - 4, s - 4);
	}
}

class Mino {
	constructor(x, y, rot, shape) {
		this.x = x;
		this.y = y;
		this.rot = rot;
		this.shape = shape;
	}
	calcBlocks() {
		let blocks = [
			new Block(-1, 0),
			new Block(0, 0),
			new Block(0, -1),
			new Block(1, 0),
		];
		let rot = (40000000 + this.rot) % 4;
		for (let r = 0; r < rot; r++) {
			blocks = blocks.map(b => new Block(-b.y, b.x));
		}
		blocks.forEach(b => {
			b.x += this.x;
			b.y += this.y;
		});
		return blocks;
	}
	draw() {
		let blocks = this.calcBlocks();
		for (let b of blocks) {
			b.draw();
		}
	}
	copy() {
		return new Mino(this.x, this.y, this.rot, this.shape);
	}
}

class Field {
	constructor() {
		this.tiles = [
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1]
		];
	}
	tileAt(x, y) {
		return this.tiles[y][x];
	}
	draw() {
		for (let y = 0; y < 21; y++) {
			for (let x = 0; x < 12; x++) {
				if (this.tileAt(x, y) === 0) continue;
				new Block(x, y).draw();
			}
		}
	}
}

class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: "gameScene" });
	}

	create() {
		nowScene = this;

		this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
		this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

		this.mino = new Mino(5, 10, 0, 0);
		this.minoVx = 0;
		this.field = new Field();
		this.mino.draw();
		this.field.draw();
		this.fc = 0;
		this.fade = new Fade(this, 1);

	}

	isMinoMovable(mino, field) {
		let blocks = mino.calcBlocks();
		return blocks.every(b => field.tileAt(b.x, b.y) === 0);
	}

	update(time, delta) {
		nowScene = this;
		if (!this.fade.isComplete) {
			return;
		}

		console.log(delta);

		if (this.fc % 20 === 19) {
			let futureMino = this.mino.copy();
			futureMino.y += 1;
			if (this.isMinoMovable(futureMino, this.field)) {
				this.mino.y += 1;
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.keyLeft)) {
			this.minoVx = -1;
		} else if (Phaser.Input.Keyboard.JustDown(this.keyRight)) {
			this.minoVx = 1;
		}

		if (Phaser.Input.Keyboard.JustDown(this.keyZ)) {
			this.mino.rot--;
		} else if (Phaser.Input.Keyboard.JustDown(this.keyX)) {
			this.mino.rot++;
		}

		if (this.minoVx !== 0) {
			let futureMino = this.mino.copy();
			futureMino.x += this.minoVx;
			if (this.isMinoMovable(futureMino, this.field)) {
				this.mino.x += this.minoVx;
			}
			this.minoVx = 0;
		}

		let pointer = this.input.activePointer;
		if (pointer.isDown) {
			console.log("hogehoge");
		}

		this.scene.systems.displayList.removeAll();
		this.mino.draw();
		this.field.draw();
		this.fc++;
	}
}