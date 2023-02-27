import Arweave from "arweave";

const ar = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
});



export default ar;