import config from "../config";

const isTld = n => n.search( /./g ) == -1;

const hasProtocol = n => n.indexOf("://") > 1;

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

const resolve_v1 = name => {
	const url = `${config.protocol}://${name}.${config.domain}/`;
	location.href = url;
};

const resolve_v3 = async ( url, behaviour ) => {
    const _target = !hasProtocol(url) ? `http://${url}` : url;
    const _url = !isTld(_target) ? _target : !_target.endsWith("/") ? _target + "/" : _target; 
    switch(behaviour) {
        case "open-tab": 
            window.open(_url, "_blanc");
            return;
        case "replace":
        default:
             window.location.replace( _url );
             return;
    };
};

const Resolve = {};
Resolve.isTld = isTld;
Resolve.hasProtocol = hasProtocol;
Resolve.search = search_v1;
Resolve.resolve = resolve_v3;

export default Resolve;