import BASE_URL from '../config/Domain'

import dynamicLogo from '../utils/Logocreator'

const CMS = 
{
	META:
	{
		URL: `https://${BASE_URL}/`,
		NAME: dynamicLogo( BASE_URL ),
		AUTHOR: `https://sh1tt.${BASE_URL}/`,
		THEME: `#000000`
	},
	CONTENT: 
	{
		HOME: 
		{
			TITLE: dynamicLogo( BASE_URL ),
			DESC: "Browse the web using handshakenames",
			HEADER: BASE_URL,
			MESSAGE: "Surf the web using handshakenames.."
		}
	}
}

export default CMS