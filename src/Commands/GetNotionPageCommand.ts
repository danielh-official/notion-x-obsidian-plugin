import MyPlugin from "../Plugin";
import {App, Notice, Vault} from "obsidian";
import {GetNotionResourceModal} from "../Modals/GetNotionResourceModal";
import CreatePageFromNotionUrl from "../Misc/CreatePageFromNotionUrl";
import {splitNotionUrl} from "../Misc/NotionHelpers";

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
				return new Notice("Please enter a URL.")
			}

			try {
				const splitUrl = splitNotionUrl(result);

				this.createPageFromNotionUrl.callPageApi(splitUrl).then((apiResponse) => {
					this.createPageFromNotionUrl.createHomeDirectoryIfNotExists().then(() => {
						this.createPageFromNotionUrl.createFileFromPage(splitUrl, apiResponse.data);
					}).catch((e: Error) => {
						new Notice(e.message)
					})
				}).catch((e: Error) => {
					new Notice(e.message)
				});
			} catch (error: any) {
				new Notice(error.message)
			}
		}).open();
	}

}
