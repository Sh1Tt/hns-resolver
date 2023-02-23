const config = {
    api: {
        host: "api.coingecko.com",
        endpoint: "/api/v3/simple/price"
    },
    cryptos: [
        "bitcoin",
        "ethereum",
        "handshake",
        "blur",
        "flux",
        "arweave",
        "akash-network",
        "juno-network"
    ],
    currencies: [
        "usd"
    ]
};

const getQuotes = async () => {
    const params = `ids=${config.cryptos.join(",")}&vs_currencies=${config.currencies[0]}`;
    const url = `https://${config.api.host}${config.api.endpoint}?${params}`;
    console.log(url);
    try {
        const data = await fetch(url, {});
        const json = await data.json();
        let quotes = [];
        Object.keys(json).forEach((key) => {
            quotes[key] = json[key].usd
        });
        return quotes;
    }
    catch (error) {
        console.log(error);
        return [];
    };
};

const Coingecko = {};
Coingecko.getQuotes = getQuotes;

export default Coingecko;