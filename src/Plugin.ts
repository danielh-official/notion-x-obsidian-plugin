import GetNotionPageCommand from "./Commands/GetNotionPageCommand";

import {Plugin} from "obsidian";
import {Settings} from "./Settings";

/**
 * The default settings.
 */
const DEFAULT_SETTINGS = {
	homeFolder: "Notion",
	notionIntegrationToken: ""
};

export default class MyPlugin extends Plugin {

	/**
	 * The getNotionPageCommand accessor.
	 */
	getNotionPageCommand: GetNotionPageCommand;

	/**
	 * The settings accessor.
	 */
	settings: Settings;

	async onload() {

		this.getNotionPageCommand = new GetNotionPageCommand(app, this);

		await this.loadSettings().then(() => {
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
