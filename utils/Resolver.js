import config from "../config";
import { validName } from "./Handshakename";

const mirror = process.env.MIRROR;

const hasProtocol = n => n.indexOf("://") !== -1;

const ensureProtocol = n => !hasProtocol(n) ? `${config.protocol}://${n}` : n;

const ensureProxy = n => ensureProtocol(n) + "." + mirror;

const search_v1 = input => {
	const engines = {
		"Hnssearch": {
			host: "",
			queryURI: q => ``,
		},
		"Google": {
			host: "google.com",
			queryURI: q => `https://www.google.com/search?q=${q}`,
		},
	};
	const url = engines[1].queryURI(input);
	window.open(url, "_blanc");
};

const resolve_v3 = async (target, behaviour) => {
	const _target = ensureProtocol(target);
    const _url = ensureTldHasSlash(_target); 
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

const proxy_v1 = target => {
    let splitted = target.split(`/`);
	const hostname = splitted[0];
	const path = splitted.slice(1).join(`/`);
	const proxy = ensureProxy(hostname);
    const url = `${proxy}/${path}`;
    window.location.replace(url);
};

const Resolver = {};
Resolver.hasProtocol = hasProtocol;
Resolver.search = search_v1;
Resolver.resolve = resolve_v3;
Resolver.proxy = proxy_v1;

export default Resolver;