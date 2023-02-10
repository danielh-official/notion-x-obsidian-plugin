import {assert} from "chai";
import {callPageApi} from "../src/Misc/NotionApi";
import {SplitNotionUrlInterface} from "../src/Interfaces";
import pageApiSuccess from "../samples/pageApiSuccess";

describe("notion api", () => {
	describe('calling postman mock', () => {
		it('should return the standard json', () => {

			const expected = pageApiSuccess;

			const splitNotionUrl: SplitNotionUrlInterface = {
				name: "Test",
				id: "12323432434234r234234",
				url: "https://notion.so/Test-12323432434234r234234"
			}

			const token = '12345678';

			callPageApi(splitNotionUrl, token).then(response => {
				assert.deepEqual(expected, response.data)
			}).catch(error => {
				assert.fail(error.message)
			})
		})
	})
})
