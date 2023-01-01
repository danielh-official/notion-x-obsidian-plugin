import {SplitNotionUrlInterface} from "../Interfaces";

export function splitNotionUrl(url: string): SplitNotionUrlInterface {

	const UrlParse = require('url-parse');

	let parsedUrl: {
		protocol: string;
		slashes: boolean;
		auth: string;
		username: string;
		password: string;
		host: string;
		hostname: string;
		port: string;
		pathname: string;
		query: object;
		hash: string;
		href: string;
		origin: string;
	} = new UrlParse(url);

	if (!(parsedUrl.hostname == 'notion.so' || parsedUrl.hostname == 'www.notion.so')) {
		throw new Error("The url must be from 'notion.so'.");
	}

	let pathname = parsedUrl.pathname;

	const id = pathname.split('-')[1];

	const name = pathname.split('-')[0]?.replace('/', '');

	if (!(name && id)) {
		throw new Error("The url is missing a proper name and id pair in its path name (e.g., Example-1233re324e343).");
	}

	return {
		name: name,
		id: id,
		url: url,
	}
}
