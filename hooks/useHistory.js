import { useContext, useState, useEffect } from "react";
import UserContext from "../components/context/User";

const initialState = {
    names: [],
    visits: []
};

const useHistory = () => {
    const { userHistory } = useContext(UserContext);
    
    const [names, setNames] = useState(initialState.names);
    const [visits, setVisits] = useState(initialState.visits);

    useEffect(() => {
        if (!userHistory)
            return;

        setNames([...userHistory.split(/,/)
            .map(r => r.split(":")[0])] 
            || []
        );
        
        setVisits([...userHistory.split(/,/)
            .map(r => parseInt(r.split(":")[1]))] 
            || []
        );

    }, [userHistory]);

    return { names, visits };
};

export default useHistory;