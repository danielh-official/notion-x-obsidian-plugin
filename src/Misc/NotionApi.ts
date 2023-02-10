import {SplitNotionUrlInterface} from "../Interfaces";
import axios from "axios";
import {
	mockProxyIsEnabled,
	mockProxyApiToken,
	mockProxyURL,
	proxyURL,
	mockProxyApiPageCallResponseStatusCode
} from '../Config/Config';

/**
 * Calls the mock api built in Postman. For development purposes.
 * @param splitUrl
 * @param token
 */
async function callPostmanMockApi(splitUrl: SplitNotionUrlInterface, token: string) {
	const data = {
		pageId: splitUrl.id,
		notionIntegrationToken: token
	}

	axios.defaults.headers.common = {
		"X-API-Key": mockProxyApiToken,
	};

	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${mockProxyURL}/api/pages/show?status=${mockProxyApiPageCallResponseStatusCode}`,
		data: data
	};

	const response = await axios(config);

	try {
		return response;
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Calls the production api.
 * @param splitUrl
 * @param token
 */
async function callProductionApi(splitUrl: SplitNotionUrlInterface, token: string) {
	const response = await axios.post(`${proxyURL}/api/pages/show`, {
		pageId: splitUrl.id,
		notionIntegrationToken: token
	});

	try {
		return response;
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Calls the api to get the page json response.
 * @param splitUrl : SplitNotionUrlInterface
 * @param rootUrl : string
 * @param token : string
 */
async function callPageApi(splitUrl: SplitNotionUrlInterface, token: string) {
	if (mockProxyIsEnabled) {
		return await callPostmanMockApi(splitUrl, token);
	} else {
		return await callProductionApi(splitUrl, token);
	}
}

export {callPageApi}
