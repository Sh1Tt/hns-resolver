import { useState, useRef, useEffect } from "react";

import styles from "../../../styles/Home.module.css";

const initial = {
	state: {
		time: "00:00 AM"
	},
	ref: {
		clock: null
	}
};

const Clock = () => {
	const [time, setTime] = useState(initial.state.time);

	const clock = useRef(initial.ref.clock);

	useEffect(() => {
		clock.current = setInterval(() => {
			setTime(new Date().toLocaleString("en-US", {
				hour: "2-digit",
				minute: "2-digit"
			}));
		}, 1 * 1_000);
		
		return () => {
			clearInterval(clock.current);
		};
	}, []);

	return (
		<div className={[styles.Widget__card]}>
			<h4 className={[styles.Clock__time]}>
				{time}
			</h4>
			<div className={[styles.Clock__date]}>
				{`${new Date().toLocaleString("en-US", {
					day: "numeric",
					month: "long",
					year: "numeric"
				})}, ${new Date().toLocaleString("en-US", {
					weekday: "long"
				})}`}
			</div>
		</div>
	);
};

export default Clock;