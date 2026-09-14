import { Text as PIXI_Text, TextStyle, CanvasTextMetrics, type TextStyleOptions } from 'pixi.js';

export interface TextConfig {
	ref?: any; //container
	text?: string | number;
	style?: TextStyle | TextStyleOptions;
}

const DEFAULT_SIZE = 9999;

export class PlayCoreText extends PIXI_Text {
	private _maxWidth: number = DEFAULT_SIZE;
	private _maxHeight: number = DEFAULT_SIZE;
	private readonly MIN_FONT_SIZE = 1;

	constructor(config: TextConfig) {
		super({
			text: config.text ? config.text.toString() : '',
			style: config.style,
		});

		this.anchor.set(0.5);
		this.roundPixels = true;

		config.ref?.addChild(this);
	}

	setMaxWidth(maxWidth: number) {
		this._maxWidth = maxWidth;
	}

	getMaxWidth() {
		return this._maxWidth;
	}

	set maxHeight(n: number) {
		this._maxHeight = n;
	}
	get maxHeight() {
		return this._maxHeight;
	}

	get metrics() {
		const style = new TextStyle(this.style);
		return CanvasTextMetrics.measureText(this.text, style);
	}

	public refresh() {
		if (this.text === '') return;

		const initialFontSize = parseInt(this.style.fontSize + '');

		if (this.metrics.width > this._maxWidth || this.metrics.height > this.maxHeight) {
			const widthRatio = this._maxWidth === DEFAULT_SIZE ? 9999 : this.metrics.width / this._maxWidth;
			const heightRatio = this.maxHeight === DEFAULT_SIZE ? 9999 : this.metrics.height / this.maxHeight;

			const minMetricsRatio = 1 / Math.min(widthRatio, heightRatio);

			const fontSize = initialFontSize * minMetricsRatio;

			this.style.fontSize = Math.max(this.MIN_FONT_SIZE, fontSize);
		}
	}
}
