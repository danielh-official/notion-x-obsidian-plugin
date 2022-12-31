import {trim} from "lodash";
import {App, TAbstractFile, TFile, TFolder, Vault} from "obsidian";
import MyPlugin from "../Plugin";

interface SplitNotionUrlInterface {
	name: string;
	id: string;
	url: string;
}

export default class CreatePageFromNotionUrl {
	plugin: MyPlugin;
	vault: Vault;

	app: App;

	constructor(app: App, plugin: MyPlugin) {
		this.app = app;
		this.plugin = plugin;
		this.vault = app.vault;
	}
	private makeBody(splitUrl: SplitNotionUrlInterface) {
		let url = trim(splitUrl.url);
		let name = trim(splitUrl.name);
		let id = trim(splitUrl.id);

		const html = `<p><hr />URL: ${url}<br />ID: ${id}<br />Name: ${name}<hr /></p>`;

		let TurndownService = require('turndown')

		let turndownService = new TurndownService({
			hr: '---'
		})
		return turndownService.turndown(html)
	}

	private create(splitUrl: SplitNotionUrlInterface) {

		let file: TAbstractFile | null;
		file = this.vault.getAbstractFileByPath(`${this.plugin.settings.homeFolder}/${splitUrl.name}.md`);

		if (file instanceof TFile) {
			throw new Error("File already exists.")
		} else {
			const body = this.makeBody(splitUrl);

			console.log((body));

			this.vault.create(`${this.plugin.settings.homeFolder}/${splitUrl.name}.md`, body).then(r => {
				console.log('Success');
			});
		}
	}

	createIfNotExists(splitUrl: SplitNotionUrlInterface) {

		let homeFolder: TAbstractFile | null;
		homeFolder = this.vault.getAbstractFileByPath(this.plugin.settings.homeFolder);

		if (homeFolder instanceof TFolder) {
			this.create(splitUrl);
		} else {
			this.vault.createFolder(this.plugin.settings.homeFolder).then(r => {
				this.create(splitUrl);
			});
		}
	}

	splitNotionUrl(url: string): SplitNotionUrlInterface {

		const UrlParse = require('url-parse');

		let parsedUrl: {
			protocol: string;
			slashes: boolean;
			auth: string;
			username: string;
			password: string;
			host: string;
			hostname: string;
			port: string;
			pathname: string;
			query: object;
			hash: string;
			href: string;
			origin: string;
		} = new UrlParse(url);

		if (!(parsedUrl.hostname == 'notion.so' || parsedUrl.hostname == 'www.notion.so')) {
			throw new Error("The url must be from 'notion.so'.");
		}

		let pathname = parsedUrl.pathname;

		const id = pathname.split('-')[1];

		const name = pathname.split('-')[0]?.replace('/', '');

		if (!(name && id)) {
			throw new Error("The url is missing a proper name and id pair (e.g., Home-1233re324e343).");
		}

		return {
			name: name,
			id: id,
			url: url,
		}
	}
}
