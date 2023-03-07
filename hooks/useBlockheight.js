import { useState, useEffect } from "react";
import Hsd from "../utils/Hsd";

const { getBlockheight } = Hsd;

const useBlockheight = () => {

    const [height, setHeight] = useState(0);

    useEffect(() => {
        const getHeight = async () => {
            const h = await getBlockheight();
            console.log(h);
            setHeight(h);
        };

        if (typeof window !== "undefined")
            getHeight();

    }, []);

    return height;
};

export default useBlockheight;