import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {assert} from "chai";
import pageApiSuccess from "../../samples/pageApiSuccess";
import {SplitNotionUrlInterface} from "../../src/Interfaces";
import {callPageApi} from "../../src/Misc/NotionApi";
describe("call postman mock api", () => {

	context('calling postman mock with success',  async () => {
		it('should return the standard json',  async () => {
			const expected = pageApiSuccess;

			process.env.MOCK_PROXY_IS_ENABLED = "true";
			process.env.MOCK_API_SERVER_URL = "https://example.mock.pstmn.io"

			const splitNotionUrl: SplitNotionUrlInterface = {
				name: "Test",
				id: "12323432434234r234234",
				url: "https://notion.so/Test-12323432434234r234234"
			}

			const token = '12345678';

			const mock = new MockAdapter(axios);
			mock.onPost(`${process.env.MOCK_API_SERVER_URL}/api/pages/show?status=200`).reply(200, expected)

			const result = await callPageApi(splitNotionUrl, token);

			assert.deepEqual(result.data, expected)
		})
	})

	context('calling postman mock with error', async () => {
		it('should return json with the unauthorized error message', async () => {
			const expected = {
				message: "You are not authorized to access this resource. Please check your Notion Integration Token and make sure it's correct."
			};

			const splitNotionUrl: SplitNotionUrlInterface = {
				name: "Test",
				id: "12323432434234r234234",
				url: "https://notion.so/Test-12323432434234r234234"
			}

			const token = '12345678';

			process.env.MOCK_PROXY_API_PAGE_CALL_RETURN = "401";
			process.env.MOCK_PROXY_IS_ENABLED = "true";
			process.env.MOCK_API_SERVER_URL = "https://example.mock.pstmn.io"

			const mock = new MockAdapter(axios);
			mock.onPost(`${process.env.MOCK_API_SERVER_URL}/api/pages/show?status=401`).reply(401, expected)

			try {
				await callPageApi(splitNotionUrl, token);
			} catch (e) {
				assert.equal(e.response.data.message, expected.message)
				assert.equal(e.message, "Request failed with status code 401")
			}
		})
	})
})
