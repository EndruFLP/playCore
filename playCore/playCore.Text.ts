import { Text as PIXI_Text, TextStyle, CanvasTextMetrics, type TextStyleOptions } from 'pixi.js';

export interface TextConfig {
	ref?: any; //container
	text?: string | number;
	style?: TextStyle | TextStyleOptions;
	maxWidth?: number;
	maxHeight?: number;
}

const DEFAULT_SIZE = 9999;

export class PlayCoreText extends PIXI_Text {
	private _maxWidth: number = DEFAULT_SIZE;
	private _maxHeight: number = DEFAULT_SIZE;
	private _baseFontSize: number;
	private readonly MIN_FONT_SIZE = 1;

	constructor(config: TextConfig) {
		super({
			text: config.text ? config.text.toString() : '',
			style: config.style,
		});

		this.anchor.set(0.5);
		this.roundPixels = true;
		this._baseFontSize = this.readFontSize();

		if (config.maxWidth !== undefined) this._maxWidth = config.maxWidth;
		if (config.maxHeight !== undefined) this._maxHeight = config.maxHeight;

		config.ref?.addChild(this);
		this.refresh();
	}

	set maxWidth(n: number) {
		this._maxWidth = n;
		this.refresh();
	}

	get maxWidth() {
		return this._maxWidth;
	}

	setMaxWidth(maxWidth: number) {
		this.maxWidth = maxWidth;
	}

	getMaxWidth() {
		return this.maxWidth;
	}

	set maxHeight(n: number) {
		this._maxHeight = n;
		this.refresh();
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

		this.style.fontSize = this._baseFontSize;

		if (this.metrics.width > this._maxWidth || this.metrics.height > this._maxHeight) {
			const widthRatio = this._maxWidth === DEFAULT_SIZE ? 9999 : this.metrics.width / this._maxWidth;
			const heightRatio = this._maxHeight === DEFAULT_SIZE ? 9999 : this.metrics.height / this._maxHeight;

			const minMetricsRatio = 1 / Math.min(widthRatio, heightRatio);
			const fontSize = this._baseFontSize * minMetricsRatio;

			this.style.fontSize = Math.max(this.MIN_FONT_SIZE, fontSize);
		}
	}

	private readFontSize() {
		const value = this.style.fontSize;
		if (typeof value === 'number') return value;
		return parseFloat(String(value)) || this.MIN_FONT_SIZE;
	}
}
