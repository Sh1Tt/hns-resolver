const valid = n => !/[`~!@#$%^&*()+={}|[\]\\;:\'\"<>,\/?]/.test( n )

const removeTrailingSlash = n => n.endsWith( `/` ) || n.endsWith( ` ` ) ? n.slice( 0, -1 ) : n

export { 
	valid, 
	removeTrailingSlash,
}