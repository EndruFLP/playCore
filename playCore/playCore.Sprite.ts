import { Point, Texture, type Container } from 'pixi.js';
import { Sprite as PIXI_Sprite } from 'pixi.js';

export interface SpriteConfig {
	ref?: Container;
	texture?: Texture;
	debugPos?: boolean;
}

export class PlayCoreSprite extends PIXI_Sprite {
	constructor(config: SpriteConfig) {
		super(config.texture ?? Texture.EMPTY);

		this.anchor.set(0.5);
		config.ref?.addChild(this);

		if (config.debugPos) {
			window.addEventListener('mousedown', (e) => {
				const local = this.toLocal(new Point(e.clientX, e.clientY));
				console.log('You clicked on a local point ( ' + local.x.toFixed(0) + ' , ' + local.y.toFixed(0) + ' )');
				console.log('Postion copied to clipboard!');
				navigator.clipboard.writeText(
					'Coordinates on sprite: ' + local.x.toFixed(0) + ' , ' + local.y.toFixed(0),
				);
			});
		}
	}

	public fitWidth(width: number) {
		this.scale.set(1);

		// Limit scale to 1
		const newWidth = width / this.width;

		this.scale.set(newWidth < 1 ? newWidth : 1);
	}

	public fitHeight(height: number) {
		this.scale.set(1);

		// Limit scale to 1
		const newHeight = height / this.height;

		this.scale.set(newHeight < 1 ? newHeight : 1);
	}
}
