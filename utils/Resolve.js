import config from '../config/domain'

// ### Resolver mechanisms ### //
const v1 = handshakename =>
{
	const url = `https://${handshakename}.${config.domain}/`

	location.href = url

}

const v2 = handshakename =>
{
	// hdns resolver ... or something

}

export {
	v1,
	v2
}