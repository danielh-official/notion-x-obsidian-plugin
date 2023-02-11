/**
 * This is the server url the Postman mock uses.
 */
export const mockProxyURL = () : string|null => {
	return process.env['MOCK_API_SERVER_URL'] ?? null;
};

/**
 * This is the private server key required to call the Postman mock.
 */
export const mockProxyApiToken = () : string|null => {
	return process.env['MOCK_API_SERVER_KEY'] ?? null;
};

/**
 * The mock api will only be called if this is enabled (i.e., true). It is disabled by default.
 */
export const mockProxyIsEnabled = () : boolean => {
	return process.env['MOCK_PROXY_IS_ENABLED'] === 'true' ?? false
};

/**
 * Controls the status code of the response for calling the page api on the Postman mock.
 */
export const mockProxyApiPageCallResponseStatusCode = () : number => {
	return process.env['MOCK_PROXY_API_PAGE_CALL_RETURN'] ? Number(process.env['MOCK_PROXY_API_PAGE_CALL_RETURN']) : 200;
};

/**
 * This is the production URL used to call the API.
 */
export const proxyURL = () : string => {
	return 'https://example.com';
};
