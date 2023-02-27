import { useState, useEffect } from "react";

const useScreensize = () => {
	const [w, setW] = useState(0);
	const [h, setH] = useState(0);

	useEffect(() => {
		if (typeof window === "undefined")
			return;
		
		setW(window.innerWidth);
		setH(window.innerHeight);
		
		window.addEventListener("resize", () => {
			setW(window.innerWidth);
			setH(window.innerHeight);
		});
		return () => {
			window.removeEventListener("resize", () => {
				setW(window.innerWidth);
				setH(window.innerHeight);
			});
		};
	}, []);

	return {
		w,
		h
	};
};

export default useScreensize;