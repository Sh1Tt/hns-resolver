import config from '../config/domain'

// ### Resolver ### //
function v1 ( handshakename )
{
	const url = `http://${handshakename}.${config.domain}/`

	location.href = url

}

export { 
	v1 
}