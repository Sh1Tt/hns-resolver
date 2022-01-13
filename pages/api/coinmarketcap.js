export default async function handler(req, res)
{
    let cache = {
        ts: new Date().getTime(),
        data: { hello: "world" },
    }

    res.status( 200 ).json( cache )
    
}