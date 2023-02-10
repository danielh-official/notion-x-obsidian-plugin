import MyPlugin from "../Plugin";
import {App, Notice, Vault} from "obsidian";
import {GetNotionResourceModal} from "../Modals/GetNotionResourceModal";
import CreateNoteFromNotionPage from "../Misc/CreateNoteFromNotionPage";
import {splitNotionUrl} from "../Misc/NotionUrlSplitter";
import {callPageApi} from "../Misc/NotionApi";

export default class GetNotionPageCommand {
	plugin: MyPlugin;
	vault: Vault;

	app: App;

	createPageFromNotionUrl: CreateNoteFromNotionPage;

	constructor(app: App, plugin: MyPlugin) {
		this.app = app;
		this.plugin = plugin;
		this.vault = app.vault;

		this.createPageFromNotionUrl = new CreateNoteFromNotionPage(this.plugin)
	}

	handle() {
		new GetNotionResourceModal(this.app, (result: string) => {
			if (!result) {
				return new Notice("Please enter a URL.")
			}

			try {
				const splitUrl = splitNotionUrl(result);

				callPageApi(splitUrl, this.plugin.settings.notionIntegrationToken).then((apiResponse) => {

					this.createPageFromNotionUrl.createHomeDirectoryIfNotExists().then(() => {

						if(apiResponse) {
							this.createPageFromNotionUrl.createFileFromPage(splitUrl, apiResponse.data);
						} else {
							throw new Error('No response was returned.')
						}

					}).catch((e: Error) => {
						new Notice(e.message)
					})
				}).catch((e: Error) => {
					new Notice(e.message)
				});
			} catch (error) {
				new Notice(error.message)
			}
		}).open();
	}

}
