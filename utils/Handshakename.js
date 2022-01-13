
const valid = n => !/[^a-zA-Z0-9-_.]/.test( n )

const removeTrailingSlash = n => n.endsWith( `/` ) || n.endsWith( ` ` ) ? n.slice( 0, -1 ) : n

export { 
	valid, 
	removeTrailingSlash
}