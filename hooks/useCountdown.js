import { useEffect, useState } from "react";

const useCountdown = props => {
    const { target } = props;

    const initialState = {
        countdown: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    };

    const [countdown, setCountdown] = useState(initialState.countdown);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(target).getTime();
            const distance = end - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                return initialState.countdown;
            };

            setCountdown({
                days,
                hours,
                minutes,
                seconds
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return countdown;
};

export default useCountdown;