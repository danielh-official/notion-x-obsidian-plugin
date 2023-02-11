import {SplitNotionUrlInterface} from "../Interfaces";
import axios from "axios";
import {
	mockProxyApiPageCallResponseStatusCode,
	mockProxyApiToken,
	mockProxyIsEnabled,
	mockProxyURL,
	proxyURL
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
		"X-API-Key": mockProxyApiToken(),
	};

	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${mockProxyURL()}/api/pages/show?status=${mockProxyApiPageCallResponseStatusCode().toString()}`,
		data: data
	};

	return axios(config);
}

/**
 * Calls the production api.
 * @param splitUrl
 * @param token
 */
async function callProductionApi(splitUrl: SplitNotionUrlInterface, token: string) {
	return await axios.post(`${proxyURL()}/api/pages/show`, {
		pageId: splitUrl.id,
		notionIntegrationToken: token
	});
}

/**
 * Calls the api to get the page json response.
 * @param splitUrl : SplitNotionUrlInterface
 * @param token : string
 */
async function callPageApi(splitUrl: SplitNotionUrlInterface, token: string) {
	if (mockProxyIsEnabled()) {
		return await callPostmanMockApi(splitUrl, token);
	} else {
		return await callProductionApi(splitUrl, token);
	}
}

export {callPageApi}
