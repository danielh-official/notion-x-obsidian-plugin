/**
 * The interface for the page contents returned from the api.
 */
export interface PageApiBodyInterface {
	object: "page";
	id: string;
	created_time: string;
	last_edited_time: string;
	created_by: {
		object: "user",
		id: string,
	};
	last_edited_by: {
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
		[key:string]: {
			id: string;
			type: string;
			title?: [
				{
					annotations: {
						bold: boolean,
						italic: boolean,
						strikethrough: boolean,
						color: "default",
						underline: boolean,
						code: boolean
					},
					href: string | null,
					plain_text: string,
					text: {
						content: string,
						link: string | null,
					},
					type: "text"
				}
			];
			multi_select?: Array<{
				id: string;
				name: string;
				color: string;
			}>;
			select?: {
				id: string;
				name: string;
				color: string;
			};
			number?: number;
			people?: Array<{
				object: string;
				id: string;
				name: string;
				avatar_url: string;
				type: string;
				person?: {
					email: string;
				}
			}>;
			date?: {
				start: string;
				end: string | null;
				time_zone: string | null;
			};
			formula?: {
				type: string;
				number: number;
			};
			relation?: Array<{
				id: string;
			}>
			has_more?: boolean;
			rich_text?: Array<{
				type: string;
				text: {
					content: string;
					link: string | null;
				};
				annotations: {
					bold: boolean;
					italic: boolean;
					strikethrough: boolean;
					underline: boolean;
					code: boolean;
					color: string;
				}
				plain_text: string;
				href: string | null;
			}>;
			checkbox?: boolean;
			rollup?: {
				type: string;
				number: number;
				function: string;
			};
			url?: string;
		}
	};
}

/**
 * Common attributes used for a property within the @interface PageApiBodyInterface properties.
 */
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

/**
 * The interface for a split Notion url.
 */
export interface SplitNotionUrlInterface {
	name: string;
	id: string;
	url: string;
}
