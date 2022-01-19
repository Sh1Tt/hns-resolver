import config from "../config/domain";

// ### Resolver ### //
function v1 ( handshakename )
{
	const url = `${config.protocol}://${handshakename}.${config.domain}/`;

	location.href = url;

}


export { 
	v1
}