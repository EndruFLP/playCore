import { Application, type ApplicationOptions } from 'pixi.js';

export type CreateAppOptions = Partial<ApplicationOptions> & {
	parent?: HTMLElement;
};

export async function createApp(options: CreateAppOptions = {}): Promise<Application> {
	const { parent = document.body, ...appOptions } = options;

	const app = new Application();
	await app.init({
		background: '#12121a',
		antialias: true,
		resizeTo: parent === document.body ? window : parent,
		...appOptions,
	});

	parent.appendChild(app.canvas);
	return app;
}
