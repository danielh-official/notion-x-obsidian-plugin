import {equal, fail, deepEqual} from "assert";
import {splitNotionUrl} from "../src/Misc/NotionHelpers";

describe('split notion url', () => {
	describe('if text w/o notion.so is given, throw error', function () {

		try {
			splitNotionUrl("test")

			fail("Error was not thrown.")
		} catch (e) {
			it('should throw notion.so error', function () {
				equal(e.message,
					"The url must be from 'notion.so'.");
			});
		}
	});

	describe('if text has notion.so but is missing name or id, throw error', function () {
		try {
			splitNotionUrl("http://www.notion.so/test")

			fail("Error was not thrown.")
		} catch (e) {
			it('should throw missing name-id pair error', function () {
				equal(e.message,
					"The url is missing a proper name and id pair in its path name (e.g., Example-1233re324e343).");
			});
		}
	})

	describe('if text has notion.so and name-id pair, return object', function () {
		const result = splitNotionUrl("https://www.notion.so/test-123")

		it('should return object', function () {
			deepEqual(result,
				{
					name: "test",
					id: "123",
					url: "https://www.notion.so/test-123"
				});
		});
	})
});
