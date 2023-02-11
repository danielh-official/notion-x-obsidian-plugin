import {SplitNotionUrlInterface} from "../Interfaces";

/**
 * Separates the url into several components.
 */
interface ParsedUrl {
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
}

/**
 * Parses a Notion URL into a @interface ParsedUrl.
 * @throws Error
 * @param url
 */
function parseUrl(url: string) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const UrlParse = require('url-parse');

	const parsedUrl: ParsedUrl = new UrlParse(url);

	if (!(parsedUrl.hostname == 'notion.so' || parsedUrl.hostname == 'www.notion.so')) {
		throw new Error("The url must be from 'notion.so'.");
	}

	return parsedUrl;
}

/**
 * Splits the pathname of the url by name and id by using the index of the last dash.
 * @param pathname
 */
function splitNameAndId(pathname : string) {
	const lastIndexOfDash = pathname.lastIndexOf('-');

	const leftOfLastDash = pathname.substring(0, lastIndexOfDash).replace('/', '');

	const rightOfLastDash = pathname.substring(lastIndexOfDash + 1);

	return {
		id: rightOfLastDash,
		name: leftOfLastDash
	};
}

/**
 * Splits a Notion url param into its two main components: name and id.
 * @param url : string
 * @return SplitNotionUrlInterface
 */
export function splitNotionUrl(url: string): SplitNotionUrlInterface {
	const parsedUrl = parseUrl(url);

	const split = splitNameAndId(parsedUrl.pathname);

	if (!(split.id && split.name)) {
		throw new Error("The url is missing a proper name and id pair in its path name (e.g., Example-1233re324e343).");
	}

	return {
		name: split.name,
		id: split.id,
		url: url,
	}
}
