/**
 * Matches `src="…"` and `href="…"` in HTML, capturing the attribute name,
 * the quote character and the URL. Global, for use with String.replace.
 */
export const URL_ATTRIBUTE_PATTERN = /\b(src|href)=(["'])(.*?)\2/gi;
