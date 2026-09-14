/**
 * Sandbox de testare. Nu importa din folderul ăsta în proiectele reale —
 * folosește `playCore/`.
 */
import { Graphics, Text } from 'pixi.js';
import { PLAYCORE_VERSION, createApp } from '../playCore/index.js';

async function main() {
  const app = await createApp();

  const marker = new Graphics().roundRect(-72, -72, 144, 144, 20).fill(0x6c5ce7);

  const label = new Text({
    text: `playCore ${PLAYCORE_VERSION}`,
    style: {
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: 22,
      fill: 0xffffff,
    },
  });
  label.anchor.set(0.5);

  const center = () => {
    const x = app.screen.width / 2;
    const y = app.screen.height / 2;
    marker.position.set(x, y);
    label.position.set(x, y + 120);
  };

  center();
  app.renderer.on('resize', center);
  app.stage.addChild(marker, label);

  app.ticker.add((ticker) => {
    marker.rotation += 0.015 * ticker.deltaTime;
  });
}

void main();
