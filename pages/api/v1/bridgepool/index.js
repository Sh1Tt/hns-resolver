import bcrypt from "bcrypt";

import clusterConnect from "../../../../utils/Atlas";

import Bridge from "../../../../models/Bridge";

clusterConnect();

const handler = async ( req, res ) =>
{	
	const { method } = req;

	switch ( method )
	{
		case "GET":
			try
			{
				const bridges = await Bridge.find( {} );

				res.status( 200 ).json( { data: bridges } );

			}
			catch ( err )
			{
				res.status( 500 ).json( { error: err } );

			}

			break;

		case "POST":
			try
			{
				const subscription = req.body;

				const subscribe = await Bridge.create( subscription );

				res.status( 201 ).json( { data: subscription } );

			}
			catch ( err )
			{
				res.status( 405 ).json( { error: err } );

			}

			break;

		case "DELETE":
			try
			{
				const subscription = await Bridge.find( { domainname: req.body.domainname } );

				const { secret } = subscription;

				console.log( secret );

				const unsubscribe = await Bridge.deleteOne( subscription );

				res.status( 200 ).json( { data: unsubscribe } );

			}
			catch ( err )
			{
				res.status( 405 ).json( { error: err } );
			}

			break;

		default:
			res.status( 400 ).json( { error: "Bad request", message: "Only GET, PUT and DELETE-requests arrr allowed." } );

			break;

	}

}

export default handler;