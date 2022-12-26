import Plugin from "./Plugin";
import {App, PluginSettingTab, Setting} from "obsidian";

export class Settings extends PluginSettingTab {
	plugin: Plugin;

	constructor(app: App, plugin: Plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private exampleSetting() {
		let {containerEl} = this;

		return new Setting(containerEl)
			.setName("Date format")
			.setDesc("Default date format")
			.addText((text) =>
				text
					.setPlaceholder("MMMM dd, yyyy")
					.setValue(this.plugin.settings.dateFormat)
					.onChange(async (value) => {
						this.plugin.settings.dateFormat = value;
						await this.plugin.saveSettings();
					})
			);
	}

	private homeFolderSetting() {
		let {containerEl} = this;

		return new Setting(containerEl)
			.setName("Home Folder")
			.setDesc("The name of the folder you want to use to host your Notion pages.")
			.addText((text) =>
				text
					.setPlaceholder("MMMM dd, yyyy")
					.setValue(this.plugin.settings.homeFolder)
					.onChange(async (value) => {
						this.plugin.settings.homeFolder = value;
						await this.plugin.saveSettings();
					})
			);
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		this.homeFolderSetting();
	}
}
