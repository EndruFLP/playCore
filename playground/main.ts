/**
 * Sandbox de testare. Nu importa din folderul ăsta în proiectele reale —
 * folosește `playCore/`.
 */
import { Assets, Graphics } from 'pixi.js';
import { PLAYCORE_VERSION, createApp } from '../playCore';
import { PlayCoreText } from '../playCore/playCore.Text';
import { PlayCoreSprite } from '../playCore/playCore.Sprite';
import buttonImage from './assets/button-purple.png';
import PlayCoreButton from '../playCore/playCore.Button';

async function main() {
	const app = await createApp();

	const logo = new Graphics()
		.roundRect(-72, -72, 144, 144, 20)
		.fill(0x6c5ce7)
		.stroke({ width: 8, color: 0xa29bfe, alignment: 0 });

	//testing

	const testText = new PlayCoreText({
		ref: app.stage,
		text: `playCore ${PLAYCORE_VERSION}`,
		style: {
			fontFamily: 'Arial, sans-serif',
			fontSize: 20,
			fontWeight: 'bolder',
			fill: 0xffffff,
		},
	});

	const testSprite = new PlayCoreSprite({
		ref: app.stage,
		texture: await Assets.load(buttonImage),
	});
	testSprite.scale.set(0.5);
	testSprite.visible = false;

	const logoLabel = () => `Logo ${logo.visible ? 'visible' : 'invisible'}`;

	const testButton = new PlayCoreButton({
		ref: app.stage,
		texture: await Assets.load(buttonImage),
		textLabel: {
			text: logoLabel(),
			style: {
				fontFamily: 'Arial, sans-serif',
				fontSize: 120,
				fill: 0xffffff,
				fontWeight: 'bolder',
			},
		},
		onClick: () => {
			logo.visible = !logo.visible;
			testButton.viewLabel.text = logoLabel();
		},
	});
	testButton.scale.set(0.5);

	function layout() {
		//center
		const x = app.screen.width / 2;
		const y = app.screen.height / 2;
		//------------

		logo.position.set(x, y - 200);
		testText.position.set(x, y - 80);
		testSprite.position.set(x, y + 160);
		testButton.position.set(x, y + 180);
	}

	layout();
	app.renderer.on('resize', layout);
	app.stage.addChild(logo, testText, testSprite, testButton);

	app.ticker.add((ticker) => {
		logo.rotation += 0.015 * ticker.deltaTime;
	});
}

main().catch((error) => {
	console.error(error);
});
