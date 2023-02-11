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
			const result = wrapInLink("https://google.com", "Google");

			it('should return <a href="https://google.com">Google</a>', () => {
				assert.equal(result, `<a href="https://google.com">Google</a>`);
			})
		})

		context("no link and 'Google' passed", () => {
			const result = wrapInLink(null, "Google");

			it('should return Google', () => {
				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in bold", () => {
		context("Google is passed with style = true", () => {
			const result = wrapInBold("Google", true);

			it('should return <strong>Google</strong>', () => {
				assert.equal(result, `<strong>Google</strong>`);
			})
		})

		context("Google is passed with style = false", () => {
			const result = wrapInBold("Google", false);

			it('should return Google', () => {
				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in italics", () => {
		context("Google is passed with style = true", () => {
			const result = wrapInItalic("Google", true);

			it('should return <em>Google</em>', () => {
				assert.equal(result, `<em>Google</em>`);
			})
		})

		context("Google is passed with style = false", () => {
			const result = wrapInItalic("Google", false);

			it('should return Google', () => {
				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in strikethrough", () => {
		context("Google is passed with style = true", () => {
			const result = wrapInStrikethrough("Google", true);

			it('should return <s>Google</s>', () => {
				assert.equal(result, `<s>Google</s>`);
			})
		})

		context("Google is passed with style = false", () => {
			const result = wrapInStrikethrough("Google", false);

			it('should return Google', () => {
				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in underline", () => {
		context("Google is passed with style = true", () => {
			const result = wrapInUnderline("Google", true);

			it('should return <u>Google</u>', () => {
				assert.equal(result, `<u>Google</u>`);
			})
		})

		context("Google is passed with style = false", () => {
			const result = wrapInUnderline("Google", false);

			it('should return Google', () => {
				assert.equal(result, `Google`);
			})
		})
	})

	describe("wrap in code", () => {
		context("Google is passed with style = true", () => {
			const result = wrapInCode("Google", true);

			it('should return <code>Google</code>', () => {
				assert.equal(result, `<code>Google</code>`);
			})
		})

		context("Google is passed with style = false", () => {
			const result = wrapInCode("Google", false);

			it('should return Google', () => {
				assert.equal(result, `Google`);
			})
		})
	})
})
