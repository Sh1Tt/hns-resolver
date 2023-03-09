import Hsd from "./Hsd.js";
const label = "hns-waldo";

const base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    encode: function(e) {
        let n, r, i, s, o, u, a, t = "", f = 0;
        e = this._utf8_encode(e);
        while (f<e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n&3) << 4 | r >> 4;
            u = (r&15) << 2 | i >> 6;
            a = i&63;
            if (isNaN(r)) {
                u = a = 64
            }
            else if (isNaN(i)) {
                a = 64
            };
            t = t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a);
        }
        return t;
    },
    decode: function(e) {
        let t = "", n, r, i, s, o, u, a, f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g,"");
        while (f<e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o&15) << 4 | u >> 2;
            i = (u&3) << 6 | a;
            t = t+String.fromCharCode(n);
            if (u!=64) t = t+String.fromCharCode(r)
            if (a!=64) t = t+String.fromCharCode(i)
        }
        t = this._utf8_decode(t);
        return t;
    },
    _utf8_encode: function(e) {
        let t = "";
        e = e.replace(/\r\n/g,"\n");
        for (let n = 0; n < e.length; n++) {
            let r = e.charCodeAt(n);
            if (r<128) {
                t+=String.fromCharCode(r)
            }
            else if (r>127&&r<2048) {
                t+=String.fromCharCode(r>>6|192);
                t+=String.fromCharCode(r&63|128)
            }
            else {
                t+=String.fromCharCode(r>>12|224);
                t+=String.fromCharCode(r>>6&63|128);
                t+=String.fromCharCode(r&63|128)
            };
        }
        return t;
    },
    _utf8_decode: function(e) {
        let c1, c2, c3;
        let t = "",
            n = 0,
            r = c1 = c2 = 0;
        while (n<e.length) {
            r = e.charCodeAt(n);
            if (r<128) {
                t+=String.fromCharCode(r);
                n++
            }
            else if (r>191&&r<224) {
                c2 = e.charCodeAt(n+1);
                t+=String.fromCharCode((r&31)<<6|c2&63);
                n+=2
            }
            else {
                c2 = e.charCodeAt(n+1);
                c3 = e.charCodeAt(n+2);
                t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3
            };
        }
        return t;
    }
};

const cyrb53 = (str, s = 0) => {
    let h1 = 0xdeadbeef ^ s, 
        h2 = 0x41c6ce57 ^ s;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    };
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

// d = domain, n = navigator, s = seed
const l4tree = (d,n,s,m="magicSalt23") => {
    const l1 = (d.length<8?d+m:d).slice(1),
          l2 = n.userAgent.replace(/[ ]/g,""),
          l3 = (d.length<8?d+m:d).slice(-1),
          l4 = n.appVersion.replace(/[ ]/g,"");
    const c1 = cyrb53(l1, s),
          c2 = cyrb53(l2, s),
          c3 = cyrb53(l3, s),
          c4 = cyrb53(l4, s);
    const h0 = cyrb53(""+c1+c2, s),
          h1 = cyrb53(""+c3+c4, s);
    const h = ""+h0+h1;
    const e = base64.encode(h);  
    return e;
};

const randChar = l => [...Array(l)].fill().map((v,i)=>base64._keyStr[Math.floor(Math.random()*base64._keyStr.length)]).join("");

const login = async input => {
    const { domain, pass } = input;
    return await new Promise(resolve => {
        Hsd.getTxtrecords(domain)
            .then(res => {
                const record = `${label}=${pass}`;
                resolve(res.includes(record) ? input 
                    : { error: "Invalid domain or password" }
                );
            })
            .catch(err => {
                console.log(err);
                resolve("");
            });
    });
};

const avatar = async domain => {
    return await new Promise(resolve => {
        Hsd.getTxtrecords(domain)
            .then(res => {
                res.map(r => {
                    const [label, hash] = r.split("=");
                    if (label === "profile avatar")
                        resolve(hash);

                });
            })
            .catch(err => {
                console.log(err);
                resolve("");
            });
    });
};

const readLabel = hash => base64.decode(hash);
const hashLabel = text => base64.encode(text);

const Auth = {};
Auth.hash = l4tree;
Auth.salt = randChar;
Auth.login = login;
Auth.avatar = avatar;
Auth.readLabel = readLabel;
Auth.hashLabel = hashLabel;

export default Auth;