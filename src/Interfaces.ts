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
		Name: {
			id: string;
			type: string;
			title: [
				{
					annotations: {
						bold: boolean,
						italic: boolean,
						strikethrough: boolean,
						color: "default",
						underline: boolean,
						code: boolean
					},
					href: string,
					plain_text: string,
					text: {
						content: string,
						link: string | null,
					},
					type: "text"
				}
			],
		}
	};
}

export interface CommonPropertyInterface extends Object {
	id: string;
	type: 'multi_select' | 'select' | 'number' | 'people' | 'date' | 'formula' | 'relation' | 'rich_text' | 'checkbox' | 'rollup' | 'url' | 'title';
	checkbox?: boolean;

	multi_select?: {
		id: string;
		name: string;
		color: string;
	}[];

	select?: {
		id: string;
		name: string;
		color: string;
	}

	number?: number;

	people?: {
		object: string;
		id: string;
		name: string;
		avatar_url: string;
		type: "person";
		person?: {
			email: string;
		}
	}[];

	date?: {
		start: string;
		end: string | null;
		time_zone: string | null;
	};

	formula?: {
		type: string;
		number: number;
	}

	relation?: {
		id: string;
	}[];

	rich_text?: {
		type: string;
		text: {
			content: string;
			link: string | null;
		};
		annotations: {
			bold: boolean,
			italic: boolean,
			strikethrough: boolean,
			color: "default",
			underline: boolean,
			code: boolean
		},
		href: string,
		plain_text: string,
	}[];
}

export interface SplitNotionUrlInterface {
	name: string;
	id: string;
	url: string;
}
