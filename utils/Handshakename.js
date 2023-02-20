import punycode from "punycode";

const valid = n => !/[`~!@#$%^&*()+={}|[\]\\;:\'\"<>,\/?]/.test(n);

const validName = n => {
	const escaped = n.replace(/^(http?:\/\/|https?:\/\/)?/i, "");
	const url = valid(escaped) ? escaped : ""
	return url;
};

const removeTrailingSlash = n => n.endsWith(`/`) || n.endsWith(` `) ? n.slice(0, -1) : n;

const hasEmoji = n => /\p{Extended_Pictographic}/u.test(n);

const toAscii = n => punycode.toASCII(n);

const toEmoji = n => punycode.toUnicode(n);

const validQuery = n => n !== "" && n !== " " && n.match(/[\s]/g);

const isTld = n => n.indexOf(".") === -1;

const ensureTldHasSlash = n => !isTld(n) ? n : !n.endsWith("/") ? n + "/" : n

export { 
	valid,
	validName,
	removeTrailingSlash,
	hasEmoji,
	toAscii,
	toEmoji,
	validQuery,
	isTld,
	ensureTldHasSlash
};