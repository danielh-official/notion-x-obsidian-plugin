import MyPlugin from "../Plugin";
import {App, Notice, Vault} from "obsidian";
import {GetNotionResourceModal} from "../Modals/GetNotionResourceModal";
import CreateNoteFromNotionPage from "../Misc/CreateNoteFromNotionPage";
import {splitNotionUrl} from "../Misc/NotionUrlSplitter";
import {callPageApi} from "../Misc/NotionApi";

export default class GetNotionPageCommand {
	/**
	 * An accessor for the plugin.
	 */
	plugin: MyPlugin;

	/**
	 * An accessor for the vault.
	 */
	vault: Vault;

	/**
	 * An accessor for the app.
	 */
	app: App;

	/**
	 * An accessor for createPageFromNotionUrl.
	 */
	createPageFromNotionUrl: CreateNoteFromNotionPage;

	constructor(app: App, plugin: MyPlugin) {
		this.app = app;
		this.plugin = plugin;
		this.vault = app.vault;

		this.createPageFromNotionUrl = new CreateNoteFromNotionPage(this.plugin)
	}

	/**
	 * Handles the command logic.
	 */
	handle() {
		new GetNotionResourceModal(this.app, (result: string) => {
			if (!result) {
				return new Notice("Please enter a URL.")
			}

			try {
				/**
				 * The split Notion url via the @interface SplitNotionUrlInterface.
				 */
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
