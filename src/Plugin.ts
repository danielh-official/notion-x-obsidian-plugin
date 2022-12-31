import GetNotionPageCommand from "./Commands/GetNotionPageCommand";

import {App, Editor, MarkdownView, Plugin} from "obsidian";
import {Settings} from "./Settings";

const DEFAULT_SETTINGS = {
	notionIntegrationTokenIndex: {},
	homeFolder: "Notion"
};

export default class MyPlugin extends Plugin {
	getNotionPageCommand: GetNotionPageCommand;

	settings: any;

	proxyUrl = "http://127.0.0.1:6060";

	async onload() {
		require("dotenv").config();

		this.getNotionPageCommand = new GetNotionPageCommand(app, this);

		await this.loadSettings().then(response => {
			this.addSettingTab(new Settings(this.app, this));

			this.addCommand({
				id: "sync",
				name: "Sync",
				callback: async () => {
					this.getNotionPageCommand.handle();
				}
			});
		});
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
