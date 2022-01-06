// ### Resolver mechanisms ### //
const v1 = handshakename =>
{
	const url = `https://${handshakename}.hns.is/`

	location.href = url

}

const v2 = handshakename =>
{
	// method 

}

export {
	v1,
	v2
}