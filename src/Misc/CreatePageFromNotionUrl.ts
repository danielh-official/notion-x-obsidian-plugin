import {split, trim} from "lodash";
import {App, Notice, TAbstractFile, TFile, TFolder, Vault} from "obsidian";
import MyPlugin from "../Plugin";
import {MarkdownTemplate} from "../Views/MarkdownTemplate";
import {renderToString} from 'react-dom/server'
import axios, {AxiosResponse} from "axios";
import {PageApiBodyInterface, SplitNotionUrlInterface} from "../Interfaces";

export default class CreatePageFromNotionUrl {
	plugin: MyPlugin;
	vault: Vault;

	app: App;

	constructor(app: App, plugin: MyPlugin) {
		this.app = app;
		this.plugin = plugin;
		this.vault = app.vault;
	}

	async callPageApi(splitUrl: SplitNotionUrlInterface): Promise<PageApiBodyInterface | any> {

		const response = await axios.post(`${this.plugin.proxyUrl}/api/pages/show`, {
			pageId: splitUrl.id,
			notionIntegrationToken: this.plugin.settings.notionIntegrationToken
		});

		try {
			return response;
		} catch (e: any) {
			throw new Error(e.message)
		}
	}

	private makeBody(splitUrl: SplitNotionUrlInterface, data: PageApiBodyInterface) {
		let url = trim(splitUrl.url);
		let name = trim(splitUrl.name);
		let id = trim(splitUrl.id);

		const html = renderToString(MarkdownTemplate(splitUrl, data));

		let TurndownService = require('turndown')

		let turndownService = new TurndownService({
			hr: '---',
			headingStyle: 'atx',
			bulletListMarker: '-'
		})
		return turndownService.turndown(html)
	}

	createFileFromPage(splitUrl: SplitNotionUrlInterface, apiResponseBody: PageApiBodyInterface) {

		let file: TAbstractFile | null;
		file = this.vault.getAbstractFileByPath(`${this.plugin.settings.homeFolder}/${splitUrl.name}.md`);

		const body = this.makeBody(splitUrl, apiResponseBody);

		if (file instanceof TFile) {
			this.vault.modify(file, body).then(r => {
				new Notice(`Note was successfully modified from Notion: "${splitUrl.name}"`);
			});
		} else {
			this.vault.create(`${this.plugin.settings.homeFolder}/${splitUrl.name}.md`, body).then(r => {
				new Notice(`Note was successfully created from Notion: "${splitUrl.name}"`);
			});
		}
	}

	async createHomeDirectoryIfNotExists(): Promise<void> {

		let homeFolder: TAbstractFile | null;
		homeFolder = this.vault.getAbstractFileByPath(this.plugin.settings.homeFolder);

		if (!(homeFolder instanceof TFolder)) {
			await this.vault.createFolder(this.plugin.settings.homeFolder).catch((e: Error) => {
				throw new Error(e.message)
			});
		}
	}
}
