/**
 * Sandbox de testare. Nu importa din folderul ăsta în proiectele reale —
 * folosește `playCore/`.
 */
import { Graphics } from 'pixi.js';
import { PLAYCORE_VERSION, createApp } from '../playCore';
import { PlayCoreText } from '../playCore/playCore.Text';

async function main() {
	const app = await createApp();

	const marker = new Graphics().roundRect(-72, -72, 144, 144, 20).fill(0x6c5ce7);

	//testing

	const testText = new PlayCoreText({
		ref: app.stage,
		text: `playCore ${PLAYCORE_VERSION}`,
		style: {
			fontFamily: 'Arial, sans-serif',
			fontSize: 120,
			fontWeight: 'bolder',
			fill: 0x6c5ce9,
		},
	});

	testText.maxWidth = 200;

	function layout() {
		const x = app.screen.width / 2;
		const y = app.screen.height / 2;
		marker.position.set(x, y);
		testText.position.set(x, y + 120);
	}

	layout();
	app.renderer.on('resize', layout);
	app.stage.addChild(marker, testText);

	app.ticker.add((ticker) => {
		marker.rotation += 0.015 * ticker.deltaTime;
	});
}

main().catch((error) => {
	console.error(error);
});
