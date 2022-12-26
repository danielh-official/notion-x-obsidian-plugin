export default interface MetadataInterface {
	notionIntegrationToken: string;
	notionPageId: string;

	updateCadence: string;

	updateLastRunDate: string;

	updateNextRunDate: string;
}

export const DefaultMetadata = {
	notionIntegrationToken: "",
	notionPageId: "",
	updateCadence: "",
	updateLastRunDate: "",
	updateNextRunDate: "",
}
