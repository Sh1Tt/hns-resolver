import config from "../config/domain";

const resolve_v3 = async handshakename => 
{
    location.href = `${process.env.PROTOCOL}://${handshakename}.${process.env.WORKER}}/`;

}

export default resolve_v3;
