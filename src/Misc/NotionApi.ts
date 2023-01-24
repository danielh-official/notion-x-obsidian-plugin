import {SplitNotionUrlInterface} from "../Interfaces";
import axios from "axios";

/**
 * Calls the api to get the page json response.
 * @param splitUrl : SplitNotionUrlInterface
 * @param rootUrl : string
 * @param token : string
 */
async function callPageApi(splitUrl: SplitNotionUrlInterface, rootUrl: string, token: string) {

	const response = await axios.post(`${rootUrl}/api/pages/show`, {
		pageId: splitUrl.id,
		notionIntegrationToken: token
	});

	try {
		return response;
	} catch (e) {
		throw new Error(e.message)
	}
}

export {callPageApi}
