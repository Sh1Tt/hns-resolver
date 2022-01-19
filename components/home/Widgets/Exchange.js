import { useState, useEffect } from "react";

import styles from "../../../styles/Home.module.css";

const Exchange = () =>
{
	const initialState =
	{ 
		hns:
		{ 
			price: 0.00000000,
			percent_change_24h: 0.00
		},
		btc:
		{ 
			price: 0.00000000,
			percent_change_24h: 0.00
		},
	};

	const [ pair, updatePair ] = useState( initialState );

	const [ time, updateTime ] = useState( "00:00 AM" );

	useEffect( () =>
	{
		const intRefId = setInterval( () => {
			updateTime(
				new Date().toLocaleString( "en-US", {
					hour: "2-digit",
					minute: "2-digit",
				} )
			)
		}, 1_000 );

		function trimPrice( r )
		{
			const n = r < 1 ? 100_000_000 : 100

			return Math.round( r * n ) / n

		}

		function trimPercent(p)
		{
			return Math.round( p * 100 ) / 100
		}

		async function fetchData()
		{
			await fetch( `https://naturalmystic.shop/api/v1/exchange-proxy/latest/?id=1,5221&NM_API_KEY=ush88989-ahd986t-auhcd7787-x7`,
			{
				method: "GET",
				headers:
				{
					"Accept":"application/json",
				},
			} )
			.then( res => res.json() )
			.then( json => json.data )
			.then( data =>
			{
				updatePair( {
					hns:
					{
						price: trimPrice( data[5221].quote.USD.price ),
						percent_change_24h: trimPercent( data[5221].quote.USD.percent_change_24h )
					},
					btc:
					{
						price: trimPrice( data[1].quote.USD.price ),
						percent_change_24h: trimPercent( data[1].quote.USD.percent_change_24h )
					}
				} )

			} )
			.catch( err =>
			{ 
				console.log( err );
			} )
		}

		fetchData();

	}, [] );

	return (
		<>
			<div className={styles.widgetWrapper}>
				<div className={styles.widgetClock}>
					<div className={styles.Clock}>
						<h5 className={styles.Time}>
							{time}
						</h5>
						<div className={styles.Date}>
							{new Date().toLocaleString( "en-US", {
								day: "numeric",
								month: "long",
								year: "numeric"
							} )}

							{`, ${new Date().toLocaleString( "en-US", {
														weekday: "long"
													} )}`}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.widgetWrapper}>
				<div className={styles.widgetExchange}>
					<div className={styles.Pair}>
						<h5 className={styles.PairHeader}>
							HNS
						</h5>
						<span className={styles.PairPercent}>
							{pair.hns.percent_change_24h}%
						</span>
						<div className={styles.PairPrice}>
							$ {pair.hns.price}
						</div>
					</div>
				</div>
			</div>
		</>
	);

}

export default Exchange;