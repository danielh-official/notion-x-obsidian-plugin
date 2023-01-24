import GetNotionPageCommand from "./Commands/GetNotionPageCommand";

import {Plugin} from "obsidian";
import {Settings} from "./Settings";

const DEFAULT_SETTINGS = {
	notionIntegrationTokenIndex: {},
	homeFolder: "Notion",
	notionIntegrationToken: ""
};

export default class MyPlugin extends Plugin {
	getNotionPageCommand: GetNotionPageCommand;

	settings: Settings;

	proxyUrl = "https://bbc9758b-eff2-437f-8bd2-4750a49cc93e.mock.pstmn.io";

	async onload() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require("dotenv").config();

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
