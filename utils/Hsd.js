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

const getQuotes = async () => {
    try {

        const res = await fetch(`https://donna.hsd.services/v1/exchange-proxy/resolver?x-api-key=Sxh90-8s00Y-D98dy-9jdpd`, {});
        const json = await res.json();
        const data = json.data;
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    };
};

const Hsd = {};

Hsd.getBlockheight = getBlockheight;
Hsd.getAsvt = getAsvt;
Hsd.getQuotes = getQuotes;

export default Hsd;