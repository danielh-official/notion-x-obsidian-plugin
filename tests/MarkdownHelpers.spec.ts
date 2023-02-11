import {assert} from "chai";
import {
	wrapInBold,
	wrapInCode,
	wrapInItalic,
	wrapInLink,
	wrapInStrikethrough,
	wrapInUnderline
} from "../src/Misc/MarkdownHelpers";

describe("markdown helpers", () => {
	describe("wrap in link", () => {
		context("https://google.com and 'Google' passed", () => {
			it('should return <a href="https://google.com">Google</a>', () => {
				const result = wrapInLink("https://google.com", "Google");

				assert.equal(result, `<a href="https://google.com">Google</a>`);
			})
		})

		context("no link and 'Google' passed", () => {
			it('should return Google', () => {
				const result = wrapInLink(null, "Google");

				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in bold", () => {
		context("Google is passed with style = true", () => {
			it('should return <strong>Google</strong>', () => {
				const result = wrapInBold("Google", true);

				assert.equal(result, `<strong>Google</strong>`);
			})
		})

		context("Google is passed with style = false", () => {
			it('should return Google', () => {
				const result = wrapInBold("Google", false);

				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in italics", () => {
		context("Google is passed with style = true", () => {
			it('should return <em>Google</em>', () => {
				const result = wrapInItalic("Google", true);

				assert.equal(result, `<em>Google</em>`);
			})
		})

		context("Google is passed with style = false", () => {
			it('should return Google', () => {
				const result = wrapInItalic("Google", false);

				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in strikethrough", () => {
		context("Google is passed with style = true", () => {
			it('should return <s>Google</s>', () => {
				const result = wrapInStrikethrough("Google", true);

				assert.equal(result, `<s>Google</s>`);
			})
		})

		context("Google is passed with style = false", () => {
			it('should return Google', () => {
				const result = wrapInStrikethrough("Google", false);

				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in underline", () => {
		context("Google is passed with style = true", () => {
			it('should return <u>Google</u>', () => {
				const result = wrapInUnderline("Google", true);

				assert.equal(result, `<u>Google</u>`);
			})
		})

		context("Google is passed with style = false", () => {
			it('should return Google', () => {
				const result = wrapInUnderline("Google", false);

				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in code", () => {
		context("Google is passed with style = true", () => {
			it('should return <code>Google</code>', () => {
				const result = wrapInCode("Google", true);

				assert.equal(result, `<code>Google</code>`);
			})
		})

		context("Google is passed with style = false", () => {
			it('should return Google', () => {
				const result = wrapInCode("Google", false);

				assert.equal(result, `Google`);
			})
		})
	})
})
