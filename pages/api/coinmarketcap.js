export default async function handler(req, res)
{
    return new Promise( ( resolve, reject ) =>
    {
        fetch( `https://naturalmystic.shop/api/v1/exchange-proxy/latest/?id=1,1027,8916&NM_API_KEY=ush88989-ahd986t-auhcd7787-x7`,
        {
            method: "GET",
            headers:
            {
                "Accept":"application/json",
            },
        } )
        .then( res => res.json() )
        .then( json => json.data )
        .then( data =>
        {
            // const reply = [ ...Object.keys( data ).map( key => data[key] ) ]
            res.setHeader('Content-Type', 'application/json');
            
            res.setHeader('Cache-Control', 'max-age=180000');
            
            res.status( 200 );
            
            res.end( JSON.stringify( data ) );

            resolve();
            
        } )
        .catch( err =>
        { 
            res.status( 405 ).json( { err } ).end();    
            
            resolve();

        } );

    })

}