import { useState, useEffect } from "react";

import styles from "../../../styles/Home.module.css";

const current = {
	time: new Date().toLocaleString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	}),
	date: new Date().toLocaleString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}),
	weekday: new Date().toLocaleString("en-US", {
		weekday: "long",
	}),
};

const Clock = () => {
	const initial = {
		state: {
			time: "00:00 AM"
		}
	};
	const [time, setTime] = useState(initial.state.time);

	useEffect(() => {
		const intRefId = setInterval(() => {
			setTime(current.time);
		}, 1_000);

		return () => {
			clearInterval(intRefId);
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