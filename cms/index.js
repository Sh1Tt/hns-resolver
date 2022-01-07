import config from '../config/domain'

import pointerLogo from '../utils/Pointerlogo'

const CMS = 
{
	META:
	{
		URL: `https://${config.domain}/`,
		DOMAIN: config.domain,
		NAME: pointerLogo( config.domain ),
		AUTHOR: `https://sh1tt.${config.domain}/`,
		THEME: `#000000`
	},
	CONTENT: 
	{
		HOME: 
		{
			TITLE: pointerLogo( config.domain ),
			DESC: "Browse the web using handshakenames",
			HEADER: config.domain,
			MESSAGE: "Surf the web using handshakenames.."
		}
	}
}

export default CMS