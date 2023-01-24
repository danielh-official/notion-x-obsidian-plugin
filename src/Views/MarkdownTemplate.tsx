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

const createPropertiesArray = (pageResponseBody: PageApiBodyInterface): Array<CommonPropertyInterface> => {

	// @ts-ignore
	return Object.values(pageResponseBody.properties);
}

const parseProperty =
	(property: CommonPropertyInterface) => {
		if (property.type == 'multi_select' && property.multi_select) {
			return `${property.multi_select.map(x => x.name).join(', ')}`;
		}
	}

const propertiesMetadata = (pageResponseBody: PageApiBodyInterface) => {
	if (pageResponseBody.properties) {
		return (
			<li>
				Properties
				<ul>
					{createPropertiesArray(pageResponseBody).map(property => (
						<li>{parseProperty(property)}</li>
					))
					}
				</ul>
			</li>
		);
	}
}

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

const getNotionCoverImage = (pageResponseBody: PageApiBodyInterface): string => {
	return pageResponseBody.cover ? pageResponseBody.cover?.external.url : "";
}

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
