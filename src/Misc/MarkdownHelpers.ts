/**
 * Wraps the text in `<a></a>` to link.
 * @param link The link that's used in `href`.
 * @param text 
 * @returns 
 */
const wrapInLink =
	(link: string | null, text: string) => {
		if (link) {
			return `<a href="${link}">${text}</a>`
		}

		return text;
	}

/**
 * Wraps the text in `<strong></strong>` to bold.
 * @param text
 * @param style 
 * @returns 
 */
const wrapInBold = (text: string, style: boolean) => {
	if (style) {
		return `<strong>${text}</strong>`
	}

	return text;
}

/**
 * Wraps the text in `<em></em>` to italicize.
 * @param text 
 * @param style 
 * @returns 
 */
const wrapInItalic = (text: string, style: boolean) => {
	if (style) {
		return `<em>${text}</em>`
	}

	return text;
}

/**
 * Wraps the text in `<s></s>` to strike through.
 * @param text 
 * @param style 
 * @returns 
 */
const wrapInStrikethrough = (text: string, style: boolean) => {
	if (style) {
		return `<s>${text}</s>`
	}

	return text;
}

/**
 * Wraps the text in `<u></u>` to underline.
 * @param text 
 * @param style 
 * @returns 
 */
const wrapInUnderline = (text: string, style: boolean) => {
	if (style) {
		return `<u>${text}</u>`
	}

	return text;
}

/**
 * Wraps the text in `<code></code>` to wrap in inline code.
 * @param text 
 * @param style 
 * @returns 
 */
const wrapInCode = (text: string, style: boolean) => {
	if (style) {
		return `<code>${text}</code>`
	}

	return text;
}

export {
	wrapInStrikethrough, wrapInCode, wrapInItalic, wrapInUnderline, wrapInBold, wrapInLink
};
