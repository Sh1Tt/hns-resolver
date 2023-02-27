const apiKey = process.env.HSD_API_KEY;

const host = `donna.hsd.services`;

const getBlockheight = async () => {
    try {
        const res = await fetch(`https://${host}/hsd?x-api-key=${apiKey}`, {});
        const json = await res.json();
        return json.chain.height;
    }
    catch (error) {
        console.log(error);
        return 0;
    };
};

const getAsvt = async () => {
    try {
        const res = await fetch(`https://${host}/exchange/quotes/pair/asvt-usd`, {});
        const json = await res.json();
        return json.data.quote.USD.price;
    }
    catch (error) {
        console.log(error);
        return 0;
    };
};

const getQuotes = async () => {
    try {
        const res = await fetch(`https://${host}/v1/exchange-proxy/resolver?x-api-key=${apiKey}`, {});
        const json = await res.json();
        const data = json.data;
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    };
};

const getTxtrecords = async tld => {
    try {
        const res = await fetch(`https://${host}/dev/dig/${tld}/txt?x-api-key=${apiKey}`);
        const json = await res.json();
        return json;
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
Hsd.getTxtrecords = getTxtrecords;

export default Hsd;