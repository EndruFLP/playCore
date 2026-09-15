import type { Container, Texture } from 'pixi.js';
import { PlayCoreSprite } from './playCore.Sprite';
import { PlayCoreText } from './playCore.Text';

export interface TextLabelConfig {
	text: string;
	style?: any;
}

export interface ButtonConfig {
	ref?: Container;
	texture: Texture;
	pressedTexture?: Texture;
	textLabel?: TextLabelConfig;

	//methods
	onClick?: (e: Event) => void;
	onOver?: (e: Event) => void;
	onDown?: (e: Event) => void;
	onMove?: (e: Event) => void;
	onUp?: (e: Event) => void;
	onOut?: (e: Event) => void;
}

export default class PlayCoreButton extends PlayCoreSprite {
	private _normalTexture: Texture;
	private _pressedTexture: Texture;
	public viewLabel: PlayCoreText;
	public isDown: boolean;
	protected _disabledTint: number = 0x888888;
	protected _disabledAlpha: number = 1;
	constructor(config: ButtonConfig) {
		super(config);

		this.interactive = true;
		this.cursor = 'pointer';

		this._normalTexture = config.texture;
		this._pressedTexture = config.pressedTexture ?? this._normalTexture;

		if (config.textLabel) {
			this.viewLabel = new PlayCoreText({
				ref: this,
				text: config.textLabel.text,
				style: config.textLabel.style ? config.textLabel.style : {},
			});
			this.viewLabel.eventMode = 'none';
		}

		const onClick = (event: Event) => {
			if (config.onClick) config.onClick(event);

			this.onClick(event);
			this.updateTexture();
		};

		const onOver = (event: Event) => {
			if (config.onOver) config.onOver(event);

			this.onOver(event);
			this.updateTexture();
		};

		const onDown = (event: Event) => {
			this.isDown = true;
			if (config.onDown) config.onDown(event);

			this.onDown(event);
			this.updateTexture();
		};

		const onMove = (event: Event) => {
			if (config.onMove) config.onMove(event);

			this.onMove(event);
			this.updateTexture();
		};

		const onOut = (event: Event) => {
			this.isDown = false;

			if (config.onOut) config.onOut(event);

			this.onOut(event);
			this.updateTexture();
		};

		const onUp = (event: Event) => {
			this.isDown = false;

			if (config.onUp) config.onUp(event);

			this.onUp(event);
			this.updateTexture();
		};

		this.on('pointertap', onClick);
		this.on('pointerover', onOver);
		this.on('pointerdown', onDown);
		this.on('pointermove', onMove);
		this.on('pointerout', onOut);
		this.on('pointerup', onUp);
	}

	protected updateTexture() {
		this.texture = this._normalTexture;
		if (this.isDown) this.texture = this._pressedTexture;
	}

	set normalTexture(texture: Texture) {
		this._normalTexture = texture;
		this.updateTexture();
	}

	set pressedTexture(texture: Texture) {
		this._pressedTexture = texture;
		this.updateTexture();
	}

	set disabledTint(tint: number) {
		this._disabledTint = tint;
		this.updateDisabledEffects();
	}

	set disabledAlpha(alpha: number) {
		this._disabledAlpha = alpha;
		this.updateDisabledEffects();
	}

	get normalTexture() {
		return this._normalTexture;
	}

	get pressedTexture() {
		return this._pressedTexture;
	}

	protected onClick(_event: Event) {}
	protected onOver(_event: Event) {}
	protected onDown(_event: Event) {}
	protected onMove(_event: Event) {}
	protected onOut(_event: Event) {}
	protected onUp(_event: Event) {}

	public setDisabled(isDisabled: boolean) {
		this.interactive = !isDisabled;

		this.updateTexture();
		this.updateDisabledEffects();
	}

	public updateDisabledEffects() {
		if (this._disabledTint !== 0xffffff) {
			this.tint = this.interactive ? 0xffffff : this._disabledTint;

			if (this.viewLabel) {
				this.viewLabel.tint = this.interactive ? 0xffffff : this._disabledTint;
			}
		}

		this.alpha = this.interactive ? 1 : this._disabledAlpha;
	}
}
