const apiKey = process.env.HSD_API_KEY;

const getBlockheight = async () => {
    const res = await fetch(`https://donna.hsd.services/hsd?x-api-key=${apiKey}`, {});
    const json = await res.json();
    return json.chain.height;
};

const getAsvt = async () => {
    const res = await fetch(`https://donna.hsd.services/exchange/quotes/pair/asvt-usd`, {});
    const json = await res.json();
    return json.data.quote.USD.price;
};

const Hsd = {};

Hsd.getBlockheight = getBlockheight;
Hsd.getAsvt = getAsvt;

export default Hsd;