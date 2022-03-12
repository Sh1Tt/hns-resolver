import config from "../../../../config/bridge";

const handler = async ( req, res ) =>
{
	const { method } = req;

		fetch( config.pools )
		.then( response =>
		{
			if ( !response.ok )
			{
				throw new Error("HTTP error " + response.status);
			}

			return response.json();

		} )
		.then( json => json.pool )
		.then( pool =>
		{
			const bridges = [ ...pool.blazin.map( bridge =>
			{
				return { 
					domainname: bridge
				}

			} ) ];
			
			res.status( 200 ).json( { data: bridges } );
				
		} )
		.catch( err =>
		{
			res.status( 405 ).json( { err } );	

		} );

}

export default handler;