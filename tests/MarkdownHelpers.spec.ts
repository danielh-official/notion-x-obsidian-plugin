import {assert} from "chai";
import {
	wrapInBold,
	wrapInCode,
	wrapInItalic,
	wrapInLink,
	wrapInStrikethrough,
	wrapInUnderline
} from "../src/Misc/MarkdownHelpers";

const cases = [
	{
		name: "wrapInLink",
		tests: [
			{
				context: "https://google.com passed as link argument",
				asserts: [{
					name: 'should return <a href="https://google.com">Google</a>',
					method: () => {
						return wrapInLink("https://google.com", "Google")
					},
					result: `<a href="https://google.com">Google</a>`
				}]
			},
			{
				context: "null passed as link argument",
				asserts: [
					{
						name: 'should return Google',
						method: () => {
							return wrapInLink(null, "Google")
						},
						result: `Google`
					}
				]
			}
		]
	},
	{
		name: "wrapInBold",
		tests: [
			{
				context: "Google is passed with style = true",
				asserts: [{
					name: 'should return <strong>Google</strong>',
					method: () => {
						return wrapInBold("Google", true)
					},
					result: `<strong>Google</strong>`
				}]
			},
			{
				context: "Google is passed with style = false",
				asserts: [
					{
						name: 'should return Google',
						method: () => {
							return wrapInBold("Google", false)
						},
						result: `Google`
					}
				]
			}
		]
	},
	{
		name: "wrapInItalics",
		tests: [
			{
				context: "Google is passed with style = true",
				asserts: [{
					name: 'should return <em>Google</em>',
					method: () => {
						return wrapInItalic("Google", true)
					},
					result: `<em>Google</em>`
				}]
			},
			{
				context: "Google is passed with style = false",
				asserts: [
					{
						name: 'should return Google',
						method: () => {
							return wrapInItalic("Google", false)
						},
						result: `Google`
					}
				]
			}
		]
	},
	{
		name: "wrapInStrikethrough",
		tests: [
			{
				context: "Google is passed with style = true",
				asserts: [{
					name: 'should return <s>Google</s>',
					method: () => {
						return wrapInStrikethrough("Google", true)
					},
					result: `<s>Google</s>`
				}]
			},
			{
				context: "Google is passed with style = false",
				asserts: [
					{
						name: 'should return Google',
						method: () => {
							return wrapInStrikethrough("Google", false)
						},
						result: `Google`
					}
				]
			}
		]
	},
	{
		name: "wrapInUnderline",
		tests: [
			{
				context: "Google is passed with style = true",
				asserts: [{
					name: 'should return <u>Google</u>',
					method: () => {
						return wrapInUnderline("Google", true)
					},
					result: `<u>Google</u>`
				}]
			},
			{
				context: "Google is passed with style = false",
				asserts: [
					{
						name: 'should return Google',
						method: () => {
							return wrapInUnderline("Google", false)
						},
						result: `Google`
					}
				]
			}
		]
	},
	{
		name: "wrapInCode",
		tests: [
			{
				context: "Google is passed with style = true",
				asserts: [{
					name: 'should return <code>Google</code>',
					method: () => {
						return wrapInCode("Google", true)
					},
					result: `<code>Google</code>`
				}]
			},
			{
				context: "Google is passed with style = false",
				asserts: [
					{
						name: 'should return Google',
						method: () => {
							return wrapInCode("Google", false)
						},
						result: `Google`
					}
				]
			}
		]
	},
];

describe("MarkdownHelpers", () => {

	cases.forEach((item) => {
		describe(item.name, () => {
			item.tests.forEach((subitem) => {
				context(subitem.context, () => {
					subitem.asserts.forEach((test) => {
						it(test.name, () => {
							assert.equal(test.method(), test.result);
						})
					})
				})
			})
		});
	})

});
