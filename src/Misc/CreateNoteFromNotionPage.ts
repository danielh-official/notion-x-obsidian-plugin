import {trim} from "lodash";
import {App, Notice, TAbstractFile, TFile, TFolder, Vault} from "obsidian";
import MyPlugin from "../Plugin";
import {MarkdownTemplate} from "../Views/MarkdownTemplate";
import {renderToString} from 'react-dom/server'
import {PageApiBodyInterface, SplitNotionUrlInterface} from "../Interfaces";
import axios from "axios";

/**
 * Handles page creation logic.
 */
export default class CreateNoteFromNotionPage {
	plugin: MyPlugin;
	vault: Vault;

	constructor(plugin: MyPlugin) {
		this.plugin = plugin;
		this.vault = app.vault;
	}

	/**
	 * Responsible for generating HTML that will be used in the note's body.
	 * @param splitUrl
	 * @param data
	 * @private
	 */
	private makeBody(splitUrl: SplitNotionUrlInterface, data: PageApiBodyInterface) {
		trim(splitUrl.url);

		const html = renderToString(MarkdownTemplate(splitUrl, data));

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const TurndownService = require('turndown')

		const turndownService = new TurndownService({
			hr: '---',
			headingStyle: 'atx',
			bulletListMarker: '-'
		})
		return turndownService.turndown(html)
	}

	/**
	 * Handles the creation of the new note.
	 * @param splitUrl
	 * @param apiResponseBody
	 */
	createFileFromPage(splitUrl: SplitNotionUrlInterface, apiResponseBody: PageApiBodyInterface) {

		let file: TAbstractFile | null;
		// eslint-disable-next-line prefer-const
		file = this.vault.getAbstractFileByPath(`${this.plugin.settings.homeFolder}/${splitUrl.name}.md`);

		const body = this.makeBody(splitUrl, apiResponseBody);

		if (file instanceof TFile) {
			this.vault.modify(file, body).then(() => {
				new Notice(`Note was successfully modified from Notion: "${splitUrl.name}"`);
			});
		} else {
			this.vault.create(`${this.plugin.settings.homeFolder}/${splitUrl.name}.md`, body).then(() => {
				new Notice(`Note was successfully created from Notion: "${splitUrl.name}"`);
			});
		}
	}

	/**
	 * Creates the home directory if the not present.
	 */
	async createHomeDirectoryIfNotExists(): Promise<void> {

		let homeFolder: TAbstractFile | null;
		// eslint-disable-next-line prefer-const
		homeFolder = this.vault.getAbstractFileByPath(this.plugin.settings.homeFolder);

		if (!(homeFolder instanceof TFolder)) {
			await this.vault.createFolder(this.plugin.settings.homeFolder).catch((e: Error) => {
				throw new Error(e.message)
			});
		}
	}
}
