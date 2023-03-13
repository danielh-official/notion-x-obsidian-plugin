import {splitNotionUrl} from "../src/Misc/NotionUrlSplitter";
import {assert} from "chai";

const cases = [
	{
		case: "text w/o notion.so is given",
		assertions: [
			{
				name: "should throw an exception",
				argument: "test",
				errorMessage: "The url must be from 'notion.so'.",
				deepEqual: null,
			}
		]
	},
	{
		case: 'text has notion.so but is missing name or id',
		assertions: [
			{
				name: "should throw an exception",
				argument: "https://www.notion.so/test",
				errorMessage: "The url is missing a proper name and id pair in its path name (e.g., Example-1233re324e343).",
				deepEqual: null,
			}
		]
	},
	{
		case: 'text has notion.so but is missing name or id',
		assertions: [
			{
				name: "should return object",
				argument: "https://www.notion.so/test-two-123",
				errorMessage: null,
				deepEqual: {
					name: "test-two",
					id: "123",
					url: "https://www.notion.so/test-two-123"
				}
			}
		]
	},
	{
		case: 'text has notion.so and name-id pair',
		assertions: [
			{
				name: "should return object",
				argument: "https://www.notion.so/test-123",
				errorMessage: null,
				deepEqual: {
					name: "test",
					id: "123",
					url: "https://www.notion.so/test-123"

				},
			}
		]
	}
];

describe('NotionUrlSplitter', () => {
	describe("splitNotionUrl", () => {
		cases.forEach((item) => {
			context(item.case, function () {

				item.assertions.forEach((test) => {
					it(test.name, () => {
						if (test.errorMessage) {
							try {
								splitNotionUrl(test.argument)

								assert.fail("Error was not thrown.")
							} catch (e) {
								assert.equal(e.message,
									test.errorMessage);
							}
						} else {
							assert.deepEqual(splitNotionUrl(test.argument), test.deepEqual)
						}
					})
				})
			});
		})
	})
})
