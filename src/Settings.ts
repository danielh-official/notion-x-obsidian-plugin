import Plugin from "./Plugin";
import {App, PluginSettingTab, Setting} from "obsidian";

export class Settings extends PluginSettingTab {
	plugin: Plugin;

	homeFolder: string;
	notionIntegrationToken: string;

	constructor(app: App, plugin: Plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private homeFolderSetting(containerEl: HTMLElement) {
		return new Setting(containerEl)
			.setName("Home Folder")
			.setDesc("The name of the folder you want to use to host your Notion pages.")
			.addText((text) =>
				text
					.setPlaceholder("Notion")
					.setValue(this.plugin.settings.homeFolder)
					.onChange(async (value) => {
						this.plugin.settings.homeFolder = value;
						await this.plugin.saveSettings();
					})
			);
	}

	private apiTokenSetting(containerEl: HTMLElement) {
		return new Setting(containerEl)
			.setName("Notion Integration Token")
			.setDesc("The token used to connect to your workspace.")
			.addText((text) =>
				text
					.setPlaceholder("---")
					.setValue(this.plugin.settings.notionIntegrationToken)
					.onChange(async (value) => {
						this.plugin.settings.notionIntegrationToken = value;
						await this.plugin.saveSettings();
					})
			);
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		this.homeFolderSetting(containerEl);

		this.apiTokenSetting(containerEl);
	}
}
