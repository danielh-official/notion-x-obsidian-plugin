import Plugin from "./Plugin";
import {App, PluginSettingTab, Setting} from "obsidian";

export class Settings extends PluginSettingTab {

	/**
	 * The plugin accessor.
	 */
	plugin: Plugin;

	/**
	 * The homeFolder data accessor.
	 */
	homeFolder: string;

	/**
	 * The notionIntegrationToken data accessor.
	 */
	notionIntegrationToken: string;

	constructor(app: App, plugin: Plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * The folder used to house Notion pages when they're synced.
	 * @param containerEl 
	 * @returns 
	 */
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

	/**
	 * The setting used to house the Notion token
	 * @param containerEl 
	 * @returns 
	 * @todo Make sure the text is hidden.
	 */
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

	/**
	 * Handles the display logic for the settings.
	 */
	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		this.homeFolderSetting(containerEl);

		this.apiTokenSetting(containerEl);
	}
}
