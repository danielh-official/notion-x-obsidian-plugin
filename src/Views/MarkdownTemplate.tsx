import * as React from "react";
import {SplitNotionUrlInterface, PageApiBodyInterface} from "../Interfaces";
import moment from "moment";

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
					</ul>
				</li>
			</ul>
			<hr/>
		</div>
	);
}

export const MarkdownTemplate = (splitUrl: SplitNotionUrlInterface, pageResponseBody: PageApiBodyInterface) => {
	return (
		<div>
			{Metadata(splitUrl, pageResponseBody)}
			<h1>
				{pageResponseBody.properties.title.title.map(x => x.text.content).join(' ')}
			</h1>
		</div>
	);
};
