import {App, Modal, Setting} from "obsidian";
import MyPlugin from "../Plugin";
import _ from "lodash";
import MetadataInterface from "../Interfaces/MetadataInterface";

export default class SetNotionPageYAMLModal extends Modal {
	result: string;
	onSubmit: (metadata: MetadataInterface) => void;

	metadata: MetadataInterface;

	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin, onSubmit: (metadata: MetadataInterface) => void, metadata: MetadataInterface) {
		super(app);
		this.onSubmit = onSubmit;
		this.plugin = plugin;

		this.metadata = metadata;
	}

	private getIntegrationTokenIndexValue() {
		let integrationTokenIndex = this.plugin.settings.notionIntegrationTokenIndex;

		let setValue: string = "0";

		console.log(setValue);

		for (const [key, value] of Object.entries(integrationTokenIndex)) {
			if (value == this.metadata.notionIntegrationToken) {
				setValue = key;
				break;
			}
		}

		if (setValue == "0") {
			setValue = _.max(Object.keys(integrationTokenIndex)) ?? "1";
		}

		return setValue;
	}

	private notionIntegrationSetting() {
		const {contentEl} = this;

		const desc = document.createDocumentFragment();
		// @ts-ignore
		desc.createEl("span", null, (span) => {
			span.innerText =
				"You can access your integrations ";

			// @ts-ignore
			span.createEl("a", null, (link) => {
				link.href = `https://notion.so/my-integrations`;
				link.innerText = "here!";
			});
		});

		let setValue: string = this.getIntegrationTokenIndexValue();

		console.log(setValue);

		new Setting(contentEl)
			.setName("Enter the integration token used for getting this page.")
			.setDesc(desc)
			.addText((text) =>
				text
					.setValue(this.plugin.settings.notionIntegrationTokenIndex[setValue])
					.onChange((value) => {
						this.plugin.settings.notionIntegrationTokenIndex[setValue] = value;
					}));
	}

	private notionPageIdSetting() {
		const {contentEl} = this;

		const desc = document.createDocumentFragment();

		// @ts-ignore
		desc.createEl("p", null, (p) => {
			p.innerText =
				`e.g., https://www.notion.so/Example-123`;
		});

		new Setting(contentEl)
			.setName("Enter the url of the page you want to sync.")
			.setDesc(desc)
			.addText((text) =>
				text
					.setValue(this.metadata.notionPageId)
					.onChange((value) => {

						value = value.split('-')[1];

						this.metadata.notionPageId = value
					}));
	}

	onOpen() {
		const {contentEl} = this;

		contentEl.createEl("h1", {text: "Enter Page Details"});

		this.notionPageIdSetting();

		this.notionIntegrationSetting();

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("Submit")
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit(this.metadata);
					}));
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
