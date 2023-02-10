/**
 * This is the server url the Postman mock uses.
 */
export const mockProxyURL = process.env['MOCK_API_SERVER_URL'];

/**
 * This is the private server key required to call the Postman mock.
 */
export const mockProxyApiToken = process.env['MOCK_API_SERVER_KEY'];

/**
 * The mock api will only be called if this is enabled (i.e., true). It is disabled by default.
 */
export const mockProxyIsEnabled = process.env['MOCK_PROXY_IS_ENABLED'] ?? false;

/**
 * Controls the status code of the response for calling the page api on the Postman mock.
 */
export const mockProxyApiPageCallResponseStatusCode = process.env['MOCK_PROXY_API_PAGE_CALL_RETURN'] ?? 200;

/**
 * This is the production URL used to call the API.
 */
export const proxyURL = 'https://example.com';
