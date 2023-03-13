import pageApiSuccess from "../../samples/pageApiSuccess";
import {SplitNotionUrlInterface} from "../../src/Interfaces";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {callPageApi} from "../../src/Misc/NotionApi";
import {assert} from "chai";
import {proxyURL} from "../../src/Config/Config";

describe("callProductionApi", () => {
	context('calling production with success', async () => {
		it('should return the result json', async () => {
			const expected = pageApiSuccess;

			const splitNotionUrl: SplitNotionUrlInterface = {
				name: "Tuscan-kale",
				id: "598337872cf94fdf8782e53db20768a5",
				url: "https://www.notion.so/Tuscan-kale-598337872cf94fdf8782e53db20768a5"
			}

			process.env.MOCK_PROXY_IS_ENABLED = "false";

			const token = '12345678';

			const mock = new MockAdapter(axios);

			mock.onPost(`${proxyURL()}/api/pages/show`).reply(200, expected)

			const result = await callPageApi(splitNotionUrl, token);

			assert.deepEqual(result.data, expected)
		})
	})

	context('calling production with error', async () => {
		it('should return the unauthorized error json',  async () => {
			const expected = {
				message: "You are not authorized to access this resource. Please check your Notion Integration Token and make sure it's correct."
			};

			const splitNotionUrl: SplitNotionUrlInterface = {
				name: "Tuscan-kale",
				id: "598337872cf94fdf8782e53db20768a5",
				url: "https://www.notion.so/Tuscan-kale-598337872cf94fdf8782e53db20768a5"
			}

			process.env.MOCK_PROXY_IS_ENABLED = "false";

			const token = '12345678';

			const mock = new MockAdapter(axios);

			mock.onPost(`${proxyURL()}/api/pages/show`).reply(401, expected)

			try {
				await callPageApi(splitNotionUrl, token);
			} catch (e) {
				assert.equal(e.response.data.message, expected.message)
			}
		})
	})
})
