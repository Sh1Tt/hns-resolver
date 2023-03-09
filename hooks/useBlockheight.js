import { useState, useEffect } from "react";
import Hsd from "../utils/Hsd";

const { getBlockheight } = Hsd;

const useBlockheight = () => {

    const [height, setHeight] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getHeight = async () => {
            const h = await getBlockheight();
            console.log(h);
            setHeight(h);
            setLoading(false);
        };

        if (typeof window !== "undefined")
            getHeight();

    }, []);

    return { height, loading };
};

export default useBlockheight;