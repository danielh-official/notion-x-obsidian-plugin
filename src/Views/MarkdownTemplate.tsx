import * as React from "react";
import {SplitNotionUrlInterface, PageApiBodyInterface, CommonPropertyInterface} from "../Interfaces";
import moment from "moment";
import {
	wrapInStrikethrough,
	wrapInItalic,
	wrapInCode,
	wrapInUnderline,
	wrapInLink,
	wrapInBold
} from "../Misc/MarkdownHelpers";

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * Generates an array of properties to be used in the metadata.
 * @param pageResponseBody
 */
const createPropertiesArray = (pageResponseBody: PageApiBodyInterface): Entries<object> => {

	// @ts-ignore
	return Object.entries(pageResponseBody.properties);
}

/**
 * Parses each property based on its type.
 * @param key
 * @param property
 */
const parseProperty =
	(key: string, property: CommonPropertyInterface) => {
		if (property.type == 'multi_select' && property.multi_select) {
			return `${key}: ${property.multi_select.map(x => x.name).join(', ')}`;
		} else if (property.type == 'select' && property.select) {
			return `${key}: ${property.select.name}`;
		} else if (property.type == 'checkbox' && property.hasOwnProperty('checkbox')) {
			return `${key}: ${property.checkbox ? "True" : "False"}`;
		} else if (property.type == 'number' && property.hasOwnProperty('number')) {
			return `${key}: ${property.number}`;
		} else if (property.type == 'date' && property.hasOwnProperty('date')) {
			const startDate = property.date?.start;
			const endDate = property.date?.end;
			const timezone = property.date?.time_zone;

			const dateFormat = 'MMMM Do, YYYY';

			let dateString = moment(startDate).format(dateFormat);

			if (endDate) {
				dateString += " - " + moment(endDate).format(dateFormat);
			}

			if (timezone) {
				dateString += `(${timezone})`;
			}

			return `${key}: ${dateString}`;
		}
	}

/**
 * Creates a list of properties in the metadata.
 * @param pageResponseBody
 */
const propertiesMetadata = (pageResponseBody: PageApiBodyInterface) => {
	if (pageResponseBody.properties) {
		return (
			<li key={pageResponseBody.id}>
				Properties
				<ul>
					{createPropertiesArray(pageResponseBody).map((property) => (
						<li key={property[0]}>{parseProperty(property[0], property[1])}</li>
					))
					}
				</ul>
			</li>
		);
	}
}

/**
 * Generates the metadata for the note.
 * @param splitUrl
 * @param pageResponseBody
 * @constructor
 */
const Metadata = (splitUrl: SplitNotionUrlInterface, pageResponseBody: PageApiBodyInterface) => {
	return (
		<div>
			<hr/>
			<ul>
				<li>Last Updated At: {moment().format('MMMM Do YYYY, h:mm:ss a')}</li>
				<li>
					Notion Details
					<ul>
						<li>URL: {splitUrl.url}</li>
						<li>ID: {splitUrl.id}</li>
						<li>Name: {splitUrl.name}</li>
						<li>Archived: {pageResponseBody.archived ? "True" : "False"}</li>
						<li>Cover: {pageResponseBody.cover?.type == 'external' ? pageResponseBody.cover.external.url : "None"}</li>
						<li>Created At {moment(pageResponseBody.created_time).format('MMMM Do YYYY, h:mm:ss a')},</li>
						<li>Last Edited
							At: {moment(pageResponseBody.last_edited_time).format('MMMM Do YYYY, h:mm:ss a')}</li>
						<li>Type: {pageResponseBody.object}</li>
						<li>Icon: {pageResponseBody.icon?.type == 'emoji' ? pageResponseBody.icon.emoji : 'None'}</li>
						{propertiesMetadata(pageResponseBody)}
					</ul>
				</li>
			</ul>
			<hr/>
		</div>
	);
}

/**
 * Parses the title from the Notion page json
 * @param pageResponseBody
 */
const parseTitle = (pageResponseBody: PageApiBodyInterface) => {
	let title = "";

	if (pageResponseBody.properties.hasOwnProperty("Name")) {

		pageResponseBody.properties.Name.title.forEach((fragment) => {
			const text = fragment.text.content;

			const link = fragment.text.link;

			const annotations = fragment.annotations;

			title += wrapInCode(
				wrapInUnderline(
					wrapInStrikethrough(
						wrapInItalic(
							wrapInBold(
								wrapInLink(link, text), annotations.bold),
							annotations.italic
						), annotations.strikethrough), annotations.underline), annotations.code)
		});

		return title;

	}
}

/**
 * Gets the cover image from the Notion page json.
 * @param pageResponseBody
 */
const getNotionCoverImage = (pageResponseBody: PageApiBodyInterface): string => {
	return pageResponseBody.cover ? pageResponseBody.cover?.external.url : "";
}

/**
 * Builds the body of the template.
 * @param splitUrl
 * @param pageResponseBody
 * @constructor
 */
export const MarkdownTemplate = (splitUrl: SplitNotionUrlInterface, pageResponseBody: PageApiBodyInterface) => {
	return (
		<div>
			{Metadata(splitUrl, pageResponseBody)}
			<p>%% startNotionTitle %%</p>
			<h1>
				{parseTitle(pageResponseBody)}
			</h1>
			<p>%% endNotionTitle %%</p>

			<p>%% startNotionCoverageImage %%</p>
			<img src={getNotionCoverImage(pageResponseBody)} alt={`Cover image for ${splitUrl.name}`}/>
			<p>%% endNotionCoverageImage %%</p>
		</div>
	);
};
