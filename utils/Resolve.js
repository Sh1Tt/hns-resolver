import config from '../config/domain'

// ### Resolver ### //
function v1 ( handshakename )
{
	const url = `https://${handshakename}.${config.domain}/`

	location.href = url

}

export { 
	v1 
}