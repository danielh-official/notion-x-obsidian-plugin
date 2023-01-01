export interface PageApiBodyInterface {
	object: "page";
	id: string;
	created_time: string;
	last_edited_time: string;
	created_by: {
		object: "user",
		id: string,
	};
	lasted_edited_by: {
		object: "user",
		id: string,
	};
	cover: null | {
		external: {
			url: string;
		},
		type: "external"
	};
	icon: null | {
		emoji: string,
		type: "emoji"
	};
	parent: {
		type: "database_id",
		database_id: string,
	};
	archived: boolean | null;
	url: string;
	properties: {
		title: {
			id: 'title',
			type: 'title',
			title: [
				{
					annotations: {
						bold: boolean,
						italic: boolean,
						strikethrough: boolean,
						color: "default",
						underline: boolean,
					},
					href: string,
					plain_text: string,
					text: {
						content: string,
						link: string | null,
					},
					type: "text"
				},
			]
		}
	};
}

export interface SplitNotionUrlInterface {
	name: string;
	id: string;
	url: string;
}
