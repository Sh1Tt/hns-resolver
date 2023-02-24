import config from "../config";

const mirror = process.env.MIRROR;

const hasProtocol = n => n.indexOf("://") !== -1;

const ensureProtocol = n => !hasProtocol(n) ? `${config.protocol}://${n}` : n;

const ensureProxy = n => ensureProtocol(n) + "." + mirror;

const engines = {
	"Hnssearch": {
		domain: "hnssearch.io",
		queryURI: q => `https://hnssearch.io/search?s=${q}&page=1`,
	},
	"Google": {
		domain: "google.com",
		queryURI: q => `https://www.google.com/search?q=${q}`,
	},
	"Swisscows": {
		domain: "swisscows.com",
		queryURI: q => `https://swisscows.com/web?query=${q}`,
	},
};

const search_v1 = (input, engine = "Hnssearch") => {
	const url = engines[engine].queryURI(input);
	window.open(url, "_blanc");
};

const proxy_v1 = (target, behaviour) => {
    const _split = target.split(`/`);
	const hostname = _split[0];
	const path = _split.filter((p,i) => i > 0)
		.join(`/`);
	const proxy = ensureProxy(hostname);
    const _url = `${proxy}/${path}`;
	switch(behaviour) {
        case "open-tab": 
            window.open(_url, "_blanc");
            return;
        case "replace":
        default:
             window.location.replace(_url);
             return;
    };
};

const resolve_v3 = (target, behaviour) => {
	const removeProtcol = target.replace(/(http\:\/\/|https\:\/\/)/, "");
	const ensureSlash = removeProtcol.indexOf("/") === -1 ? removeProtcol+"/" : removeProtcol;
	const _url = `http://${ensureSlash}`;
    switch(behaviour) {
        case "open-tab": 
            window.open(_url, "_blanc");
            return;
        case "replace":
        default:
             window.location.replace(_url);
             return;
    };
};

const handle = (input, type, behaviour = "open-tab") => {
	switch(type) {
		case "search":
			search_v1(input);
			break;
		case "proxy":
			proxy_v1(input, behaviour);
			break;
		case "resolve":
		default:
			resolve_v3(input, behaviour);
			break;
	};
};

const Resolver = {};
Resolver.hasProtocol = hasProtocol;
Resolver.search = search_v1;
Resolver.handle = handle;
Resolver.proxy = proxy_v1;
Resolver.searchEngines = engines;

export default Resolver;