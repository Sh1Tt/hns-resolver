import punycode from "punycode";

const valid = n => !/[`~!@#$%^&*()+={}|[\]\\;:\'\"<>,\/?\s]/.test( n );

const removeTrailingSlash = n => ( n.endsWith( `/` ) || n.endsWith( ` ` ) ? n.slice( 0, -1 ) : n );

const hasEmoji = n => /\p{Extended_Pictographic}/u.test( n );

const toAscii = n => punycode.toASCII( n );

const toEmoji = n => punycode.toUnicode( n );

const validQuery = n => n.match( /[\s]/g );

export { 
	valid, 
	removeTrailingSlash,
	hasEmoji,
	toAscii,
	toEmoji,
	validQuery,
}