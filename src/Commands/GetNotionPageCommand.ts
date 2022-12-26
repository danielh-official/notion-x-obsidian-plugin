import MyPlugin from "../Plugin";
import axios from "axios";
import {App, Editor, MarkdownView, stringifyYaml, Vault} from "obsidian";
import SetNotionPageYAMLModal from "../Modals/SetNotionPageYAMLModal";
import parseMD from 'parse-md'
import MetadataInterface, {DefaultMetadata} from "../Interfaces/MetadataInterface";

interface GetPageResponseDataInterface {
	cover: string;
	coverType: string;
	createdTime: string;
	icon: string;
	iconType: string;
	id: string;
	lastEditedTime: string;
	objectType: string
	propertyKeys: object;
	title: string;
	url: string;
	properties: {
		id: string;
		plainText: string;
		title: string;
		type: string;

		content: {
			test: string;
		}
	}[];
}

export default class GetNotionPageCommand {
	plugin: MyPlugin;
	vault: Vault;

	app: App;

	constructor(app: App, plugin: MyPlugin) {
		this.app = app;
		this.plugin = plugin;
		this.vault = app.vault;
	}

	private showMetadataEditPrompt(editor: Editor, defaultMetadata: MetadataInterface) {
		const originalValue = editor.getValue();

		new SetNotionPageYAMLModal(
			this.app,
			this.plugin,
			(metadata) => {
				const stringMetadata = stringifyYaml(metadata);

				const originalValueSplit = originalValue.split("---");

				originalValueSplit[1] = "\n" + stringMetadata;

				const newValue = originalValueSplit.join("---")

				editor.setValue(newValue);
			},
			defaultMetadata
		).open();
	}

	private getMetadata(view: MarkdownView) {
		const markdown = parseMD(view.data);

		const defaultMetadata: MetadataInterface = DefaultMetadata;

		// @ts-ignore
		const metadata: MetadataInterface = markdown.metadata;

		if(metadata) {
			defaultMetadata.notionPageId = metadata.notionPageId;
			defaultMetadata.notionIntegrationToken = metadata.notionIntegrationToken;
			defaultMetadata.updateLastRunDate = metadata.updateLastRunDate;
			defaultMetadata.updateNextRunDate = metadata.updateNextRunDate;
			defaultMetadata.updateCadence = metadata.updateCadence;
		}

		return defaultMetadata;
	}

	private getNotionPageViaApiCall(metadata: MetadataInterface, settings: any) {
		axios.post(`${this.plugin.proxyUrl}/pages/show`, {
			notionIntegrationToken: metadata.notionIntegrationToken,
			pageId: metadata.notionPageId
		}).then(r => {
			console.log(r);
		}).then(e => {
			console.error(e);
		})
	}

	handle() {
		// const metadata = this.getMetadata(view);
		//
		// if (!(metadata.notionPageId && metadata.notionIntegrationToken)) {
		// 	this.showMetadataEditPrompt(editor, metadata);
		// } else {
		// 	this.getNotionPageViaApiCall(metadata, settings);
		// }
	}
}
