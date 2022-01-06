
const valid = n => !/[\s,<.>/?;:\'\"\[\{\]\}\\\|\`\~\!\@\#\$\%\^\&\*\(\)\=\+]/.test( n )

const removeTrailingSlash = n => n.endsWith( `/` ) ? n.slice( 0, -1 ) : n

export { 
	valid, 
	removeTrailingSlash 
}