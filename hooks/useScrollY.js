import { useState, useEffect } from "react";

const useScrollY = () => {
	const [y, setY] = useState(0);
	
	useEffect(() => {
		if (typeof window === "undefined")
			return;

		setY(window.scrollY);
		document.addEventListener("scroll", () => {
			setY(window.scrollY);
			console.log(y);
		});
		return () => {
			document.removeEventListener("scroll", () => {
				setY(window.scrollY);
				console.log(y);
			});
		};
	}, []);

	return y;
};

export default useScrollY;