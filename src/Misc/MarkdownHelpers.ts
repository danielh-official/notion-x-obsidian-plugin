const wrapInLink =
	(link: string | null, text: string) => {
		if (link) {
			return `<a href="${link}">${text}</a>`
		}

		return text;
	}

const wrapInBold = (text: string, style: boolean) => {
	if (style) {
		return `<strong>${text}</strong>`
	}

	return text;
}

const wrapInItalic = (text: string, style: boolean) => {
	if (style) {
		return `<em>${text}</em>`
	}

	return text;
}

const wrapInStrikethrough = (text: string, style: boolean) => {
	if (style) {
		return `<s>${text}</s>`
	}

	return text;
}

const wrapInUnderline = (text: string, style: boolean) => {
	if (style) {
		return `<u>${text}</u>`
	}

	return text;
}

const wrapInCode = (text: string, style: boolean) => {
	if (style) {
		return `<code>${text}</code>`
	}

	return text;
}

export {
	wrapInStrikethrough, wrapInCode, wrapInItalic, wrapInUnderline, wrapInBold, wrapInLink
};
