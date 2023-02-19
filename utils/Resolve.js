import config from "../config";

const mirror = process.env.MIRROR || "hns.is";

const isTld = n => n.indexOf(".") === -1;

const hasProtocol = n => n.indexOf("://") !== -1;

const ensureProtocol = n => !hasProtocol(n) ? `${config.protocol}://${n}` : n;

const search_v1 = input => {
	const engines = {
		Google: {
			host: "google.com",
			queryURI: q => `https://www.google.com/search?q=${q}`,
		},
		Hnssearch: {
			host: "",
			queryURI: q => ``,
		}
	};
	const engine = engines.Google;
	const url = engine.queryURI(input);
	
	window.open(url, "_blanc");
};

const resolve_v3 = async (target, behaviour) => {
	const _target = ensureProtocol(target);
    const _url = !isTld(_target) ? _target : !_target.endsWith("/") ? _target + "/" : _target; 
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

const useProxy = async target => {
	const _validate = target.replace("https://", "") + "." + mirror;
	const _target = ensureProtocol(_validate);
	const _url = !isTld(_target) ? _target : !_target.endsWith("/") ? _target + "/" : _target;
	window.location.replace(_url);
};

const Resolve = {};
Resolve.isTld = isTld;
Resolve.hasProtocol = hasProtocol;
Resolve.search = search_v1;
Resolve.resolve = resolve_v3;
Resolve.proxy = useProxy;

export default Resolve;