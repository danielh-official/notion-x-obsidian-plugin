import MyPlugin from "../Plugin";
import {App, TAbstractFile, TFile, TFolder, Vault} from "obsidian";
import {GetNotionResourceModal} from "../Modals/GetNotionResourceModal";
import CreatePageFromNotionUrl from "../Misc/CreatePageFromNotionUrl";

export default class GetNotionPageCommand {
	plugin: MyPlugin;
	vault: Vault;

	app: App;

	createPageFromNotionUrl: CreatePageFromNotionUrl;

	constructor(app: App, plugin: MyPlugin) {
		this.app = app;
		this.plugin = plugin;
		this.vault = app.vault;

		this.createPageFromNotionUrl = new CreatePageFromNotionUrl(this.app, this.plugin)
	}

	handle() {
		new GetNotionResourceModal(this.app, (result: string) => {
			if (!result) {
				throw new Error("Please enter a URL.")
			}

			const splitUrl = this.createPageFromNotionUrl.splitNotionUrl(result);

			this.createPageFromNotionUrl.createIfNotExists(splitUrl)
		}).open();
	}

}
