import {splitNotionUrl} from "../src/Misc/NotionUrlSplitter";
import {assert} from "chai";


describe('notion url splitter', () => {
	context('text w/o notion.so is given', function () {
		it('should throw an exception', () => {
			try {
				splitNotionUrl("test")

				assert.fail("Error was not thrown.")
			} catch (e) {
				it('should throw notion.so error', function () {
					assert.equal(e.message,
						"The url must be from 'notion.so'.");
				});
			}
		})
	});

	context('text has notion.so but is missing name or id', function () {
		it('should throw an exception', () => {
			try {
				splitNotionUrl("https://www.notion.so/test")

				assert.fail("Error was not thrown.")
			} catch (e) {
				it('should throw notion.so error', function () {
					assert.equal(e.message,
						"The url must be from 'notion.so'.");
				});
			}
		})
	});

	context('text has notion.so and name-id pair', () => {

		const result = splitNotionUrl("https://www.notion.so/test-123")

		it('should return object', function () {
			assert.deepEqual(result,
				{
					name: "test",
					id: "123",
					url: "https://www.notion.so/test-123"
				});
		})
	});

	context('text has notion.so and name-id pair with two dashes', () => {

		const result = splitNotionUrl("https://www.notion.so/test-two-123")

		it('should return object', function () {
			assert.deepEqual(result,
				{
					name: "test-two",
					id: "123",
					url: "https://www.notion.so/test-two-123"
				});
		})
	});
})
