import {describe} from "mocha";
import {assert} from "chai";
import {
	mockProxyApiPageCallResponseStatusCode,
	mockProxyApiToken,
	mockProxyIsEnabled,
	mockProxyURL,
	proxyURL
} from "../src/Config/Config";

const cases = [
	{
		name: "mockProxyURL",
		value: process.env['MOCK_API_SERVER_URL'],
		deletionTestString: "should evaluate to null",
		deletionEquals: null,
		assignmentTestString: "should evaluate to `https://example.com`",
		assignment: () => {
			process.env['MOCK_API_SERVER_URL'] = 'https://example.com';
		},
		method: () => {
			return mockProxyURL()
		},
		assignmentEquals: 'https://example.com'
	},
	{
		name: "mockProxyApiToken",
		value: process.env['MOCK_API_SERVER_KEY'],
		deletionTestString: "should evaluate to null",
		deletionEquals: null,
		assignmentTestString: "should evaluate to 123",
		assignment: () => {
			process.env['MOCK_API_SERVER_KEY'] = "123";
		},
		method: () => {
			return mockProxyApiToken()
		},
		assignmentEquals: "123"
	},
	{
		name: "mockProxyIsEnabled",
		value: process.env['MOCK_PROXY_IS_ENABLED'],
		deletionTestString: "should evaluate to false",
		deletionEquals: false,
		assignmentTestString: "should evaluate to true",
		assignment: () => {
			process.env['MOCK_PROXY_IS_ENABLED'] = "true";
		},
		method: () => {
			return mockProxyIsEnabled()
		},
		assignmentEquals: true
	},
	{
		name: "mockProxyApiPageCallResponseStatusCode",
		value: process.env['MOCK_PROXY_API_PAGE_CALL_RETURN'],
		deletionTestString: "should evaluate to 200",
		deletionEquals: 200,
		assignmentTestString: "should evaluate to true",
		assignment: () => {
			process.env['MOCK_PROXY_API_PAGE_CALL_RETURN'] = "400";
		},
		method: () => {
			return mockProxyApiPageCallResponseStatusCode()
		},
		assignmentEquals: 400
	},
	{
		name: "proxyURL",
		value: null,
		deletionTestString: 'should evaluate to "https://example.com"',
		deletionEquals: "https://example.com",
		assignmentTestString: 'should evaluate to "https://example.com"',
		assignment: () => {
			process.env['MOCK_PROXY_API_PAGE_CALL_RETURN'] = "400";
		},
		method: () => {
			return proxyURL()
		},
		assignmentEquals: "https://example.com"
	},
];

describe("Config", () => {
	cases.forEach((item) => {

		describe(item.name, () => {

			context("delete the env variable", () => {
				it(item.deletionTestString, () => {
					delete item.value;

					assert.equal(item.method(), item.deletionEquals)
				})
			})

			context(`assign ${item.value} to the env variable`, () => {
				it(item.assignmentTestString, () => {
					item.assignment();

					assert.equal(item.method(), item.assignmentEquals);
				})
			})
		});

	})
});
