import { useState, useEffect, useContext } from "react";

import Image from "next/image";

import Link from "next/link";

import UserContext from "../../context/User";

import styles from "../../../styles/Home.module.css";

function trimPrice( r )
{
	const n = r < 2 ? 100_000_000 : 100

	return Math.round( r * n ) / n

};

function trimPercent( p )
{
	return Math.round( p * 100 ) / 100

};

const Bullbear = ( { v, c, b, a } ) => 
{
	const moving = () => v < 0 ? 
		"deeppink"
		:
		v > 0 ?
		"yellowgreen"
		:
		"lightgray";

	return (
		<span 
			className={c}
			style={{
				color: moving(),
			}}
		>	
			<span className={styles.before}>{b}</span> {v} {a}
		</span>
	);
}

const Pair = ( { symbol, i } ) => (
	<div 
		key={i}
		data-position={i}
		className={styles.topExchangePairWrapper}
		style={{gridArea:`p_${i}`}}
	>
		<Link href={`https://coinmarketcap.com/currencies/${symbol.slug}/`}>
			<a className={styles.topExchangePair}>
				<h5>
					<strong>
						{symbol.symbol}
						<span style={{
							height: '100%',
							lockRatio: '1',
							margin: 'auto',
							transform: 'scale( 2 )'
						}}>
							<Image width={9} height={9} src={symbol.quote.USD.percent_change_24h > 0 ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADmUlEQVRoge2TTWhcZRSGn3Nn0qS0UwLFjQELxmwaajJ3JhFjLRGSRqJSCk1AwQptJuNP7ULaTUTIom78W9hgOpnUStBQxiIFIaRRSCi2tWbunTQSBdsoBlIFUZPG0kkzc4+LRvAnk2T+oMJ9lvd+55z34XwfuLi4uLi4uLi4/G+JWmZX1DK7ij1Hitk8YpmHBI4DoHK0M2i9VaxZRROJ2v6DqhL9xzDRUMhMnCzGvKKIRG3/PlU5DXhU5Qiii8ubcVTl2XDQGiz0TKPQDaOJ2j2qMgh4UOkKB623wwG7R+EVwBDRgUg80FbouQXdSJ/tb0LlU6AMlWOdQeu1v/+PWuYxhVeB2+IYe0N18aFCzS6YSF+itgHHGAE2oXK8M2gdXulcxDLfEDgK3BLHaA3VxccKMb8gIv3jwXrHcD4HfMAHIdM+IIKudFYVidpmLxAGbhiO0dxRF/8q3wx5v5FIPLBDDWcI8KFypny6siOTBIAIet20XwQ+ArY4hnMuEg+Y+ebIS+REorbKEB1R2Aqcvb7ge7q9/eP0WnXdglM+XfkcEAPKRXT4hO3fnk+WnK9WJB64T0TPA9sQ/SzpW3jqcNW1xWx6xKaqN8wlSz8BngBmvY5n14G68e9zyZPTRnonaioQHeWOxIUyT3pvthIA7dVTt/9YLG1DdAyoSBnp0X7bvy2XTFlv5H3bf09KZQzYDlz23NrYfHDnhYVchv/FwJUHNyVT3mFgJ3B1Ke3Z9VL9+M/Z9MhqI6cSteUplWHuSEwai6Wt+UoA7K+ZvKkqTwI2UFXiSY/0XK7fmk2PdYu8++VDW5ZUzgEmKt8tpT0tHQ2Xfssyc0bCQWveK/o48A2wY0PJ0tDJLx7xrbd+XVfrnYsPb9xclhxCpRGYUZVHw0FrJsfMq9I7UVNhpD3nBe4HLpZ5U7v310zeXKtuzY3Epqo3bC5LnlmWmBVvqrFYEgAv1F6ZReUx4EegIZnynj012li2Vt2qIrFYm2d+sfRDVFqBXwSaQzWTPxQoc0bCQWvGMZxm4Cegacm3cDoSD5SsVpNRpFsx5h+4NqBKGzBnOEZLKGB/W+DMGXneP3FVVVoEfkV0j8BgLNbmyXR+RRFV5F7bfE9VngFuYDi7O+riiaKlzkA4aH2thtME/I7ovrnK6f5uXTnzio+9zzLfBI4UM2Qe9HQG7Jf//fE/dhHLfJ27VwLg0HJGFxcXFxcXFxcXFxeXu4I/AaRKScbxjOluAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADbUlEQVRoge2YT2gcZRjGf+9M0la0tenMGEukouhFUDQHL4I10KZBD+aQloIVlFqKze6GSqvYeljwD5SCkt2NQbSgCG2pggiSg4k1CvaQggcLLVgQWyg02Zm6JFS3m+y8HtaUsLtp9s9s6+H7Hb953/d5nvm+YYYBg8FgMBgMBoPBYLgzSPmCOpn3ET10J8zUjMoHEsQOL12qCAKgbvoocOC2mKoXISPZeLxyuQqKCu7IKOheYBa1tkgweLblJqt58UaeRMPTQAcqnxP4u4VkWF5nVWsWRPH9fcBxYB0Sfq9e6qkWe65AO9OPQzhBKcTXBPe9Vi0ELLMjNwdxysadPgFsB7KotVmCwQst8Fyp7Q0/ilo/ARtBv8VfvV3YO79cfdUdWUTYUcQPdgFjgIeE49qZfihizxVox/Am1BoHNgIT3LN2561CwApBAIRkgTXzA8Ak0EWRSe0Y3hSN5UrUGe3Ctn4EHkTlDHa+X/58Nb+yz1oFNqTWYck48DTwO2Jtluzg1SY8V2rcn/JYkEngMWAK/t4i/ltztfTWHARA13+0nra2H4Bu0N8oLPTI7BvXGvBcObvjk3uxC6eBbpRzFKRH5mJBrf0rHq2lSG5/jjbtA86DPMGq9jF1j6yt13Q52nn0buwb3wHdwEUsq7eeEFDnjtwUdka7kIWfgYeBX7Dz22T64PWGZj3w4V3k28eA54DLLMizkotdqndOXTuyiASvX6EY9gCXgGcI13yjj6RW1ztHSa4i3/4VpRBXsO2eRkJAg0EA5K+hy0i4FbiKspWcnFSSbbX2l95RG74EXgCyhNor0/v+aNRPw0EAJDt0EZtehADox3FPKKfslfqUpIU78wXIDiAH0ifXEueb8dJUEACZjp8j1OdB5hAdwJn5TNFln73Sd5z7MehLwCyq28SP/dqsj6aDAEiQmMIq9gHXEX0FJzO8bLE7cuS/j9F/gBclSExF4SGSIAAyM3QG1X4gjxBXJ/NueY066fdADwIFRAbEj09GpR9ZEAAJEhOo7ATmEX1Hnczbi9fUTe9HOAwUEXZJNjYWqXaUwxZRLzWAyknABj2AcgORNBACL4sfPx61ZkuCAKiX3o3yaZnaHsnGj7VCL9KjtRTJxo+hmqB0swR4s1UhbgvqpQ6pl/p//8wwGAwGg8FgMNySfwHKYiHKd3ImJgAAAABJRU5ErkJggg==" } alt="price movement idicator icon" />
						</span>
					</strong>
					<Bullbear v={trimPercent( symbol.quote.USD.percent_change_24h )} c={styles.topExchangePairPrecentChange24h} b={"24h "} a={"%"} />
				</h5>
				<p>
					<span>
						${trimPrice( symbol.quote.USD.price )}
					</span>
					<Bullbear v={trimPercent( symbol.quote.USD.percent_change_7d )} c={styles.topExchangePairPrecentChange7d} b={"7d "} a={"%"} />
				</p>
				<span className={styles.topExchangePairXline} />
				{/*<code>{symbol.quote.USD.market_cap}</code>*/}
			</a>
		</Link>
	</div>
);


const Exchange = () =>
{
	const { getStoreSymbols, setStoreSymbols } = useContext( UserContext );

	const initialState =
	{ 
		symbols:
		{
			"5221":
			{
				symbol: "hns",
				quote:
				{
					USD:
					{
						price: 0,
						percent_change_24h: 0,
					}
				},
			},
		},
	};

	const [ cmcData, setCmcData ] = useState( initialState );

	const [ time, updateTime ] = useState( "00:00 AM" );

	const [ sWidth, setSWidth ] = useState( 7 );

	useEffect( () =>
	{
		const intRefId = setInterval( () =>
		{
			updateTime(
				new Date().toLocaleString( "en-US", {
					hour: "2-digit",
					minute: "2-digit",
				} )
			)
		}, 1_000 );

		async function fetchData()
		{
			const symbols = Object.values( [ "5221", "3575", ...getStoreSymbols() ] );

			const queryParam = [ ...new Set( symbols ) ].join().replace( /\"/, "");

			// console.log( queryParam )

			await fetch( `https://naturalmystic.shop/api/v1/exchange-proxy/latest/?id=${queryParam}&NM_API_KEY=ush88989-ahd986t-auhcd7787-x7`,
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
				const filter = data;

				setCmcData( { symbols:
					filter
				} );

			} )
			.catch( err =>
			{ 
				console.log( err );
			
			} );
		}

		setSWidth( parseInt( ( ( window.innerWidth - 156 ) / 156 ) ) );

		fetchData();

		return () =>
		{
			clearInterval( intRefId )
		}

	}, [] );

	// console.log( parseInt( ( window.innerWidth - 156 ) / 156 ) );

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
							<span id="hns_percent_change_24h" className={styles.PairPercent}>
								{trimPercent( cmcData.symbols[5221].quote.USD.percent_change_24h )}%
							</span>
							<style>{`
								#hns_percent_change_24h
								{
									color: ${cmcData.symbols[5221].quote.USD.percent_change_24h > 0 ? 'greenyellow' : 'red'} !important;
								}
							`}</style>
							<span>
								{cmcData.symbols[5221].quote.USD.percent_change_24h > 0 ?
								<Image width={40} height={40} alt="bull market icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAJkUlEQVRoge2YeYxV1R3HP+cub50ZZoBxYFAZsbKISwxqU5sGqFoNMAqlxWpN6lLBqtiqBZe2RltqjTEal0ZL6aJNNUWrtVBJjYqAJS7UCDIO41JUBGGY92Z7y313Ob/+8Zg323vzBhhbY/wm7493zvktn/u759xzDnyhz5bUp+F07YcdNZ5tT9IKI+x6782bWN1eaqyIqN990n3+/pTedvPk6v8AJBYsONcw5LJSNkEuV+U63uL655//qKdtREGe3Jc6xxBuEpjZx7cGNgk8jWJ9ONB7spZhGdqYqJSc64r+7tZ2p+vOabWnFuBAdSycfz9wzcAY4vs4bW2YkfjJdS+8sK2n3RoJABFRT+1L34PwQxn8cAxgpoKZCLiGganzfB+kXZpSbse4CvW1vgYKRP76t2vbF84/TcGXe9q175FrSyA6GJTDiIA8tTd1O0r9qG+bowVfhLhp9CNLBZoPsz7vp11AWqtiwYw7Jh25b6DPzoULfqyQXgjPI5dsQ7QumsNhgzy5p2sqSt1UCCiwuSNDS8pFC5hKETUUSkHGFwKEKlvlxoXtVfdPq12KUjLQZ8fCBcsEuasXwiWXSJSEGBaIrJ9VQVjN0KgTQU8ANRolLkq1ilbv/VO6FzmMsnvGt6RzNHe7VNtmptY2XhZleAF6DBpth9RHluKpe6Yf8USpeIMhvLIQJUFkyww7cEfNN5RcpmE2EAah9/VXILDXmsirKZuTR+VbXS1s7cpRFzL3jx4zbuK9R6lsuQc1JISbw0km8mUuo34gIqjg1VkXaE+tUEqOLWf+ePhSXut0+TinqbYMdjk+3b5mcgU3/PKwIVycRAKkNwszGl+FBKcHjnPSQHujAPHa7OnBK7PXK1GPA8eWC5xVFfzLmwTAHsfn7ZRLt6+pNIWbd555w0hDWPHYynEvvnRF3fpNp5iRyLaBPgogOlA/Vfn1f1iycak0By+Dk2U3npM+2dtw2hnD8ZNcuOAnfSGCXA4n0QbSOyesWPQ3dc9vWAKgQNet33TKEaNH7ygKcrCyxGWFt4KGkFNoi5vCWZ2PYUViGHbFWeV8dCxcsEwhK3r+65xDLjm4EnUvbLyyr50CrZ54wu2Xz6GCABwZvMevs1ewx2ygy7M5quM1QqaJPboeYFI5iP6VcMglk4MhDlSinEbkg1gffEC9AVTW9DYq3i81fhCE4+Amk+RXxgOJHQQEDOPVEim9dr3uT+SbrZdzR/LsgV27jaw8UMxmIITvZHHbk8hhQECZivhOCmXamHZ4UF9WK+Z2XUMiZfFM55doCCW5qOLfAIioZWr2+o6BNrJ4sd2RaJ1T8J/NQ/SVGTt4iCFBdOCRbd9H5fjir3pYPJZ7f+DGyqvB9bn0w2+xafwxnG42c3HV9teL2aiVK709jY1zo2FzTZDJfN1t77+7L1qJv7echqEfADU4V+FeGqf+GYZ4tbxsNyKltwWGabFErWOJPINRG8MfV03CN2j0XyJskSplV79mTSbXlTnPS6X6UVjx6GCILVtsDPk9qCkg7YN/Kl2wL5mpaEAInAxmJF50SLRqDHcmH+TG4BEAaqSbWGV9SZc9Gvfcc+k9s2ZNNmze0Z5XU3JO7I0vA04AuYR50x4ZymfJiigjz+h0J+i7mvSVFakgNnoCtSHN2LAmVlOPFa0ArSvLwdS/9FKbijA1FIvdWhRiXXMDqFtQbGDu1EfL+StZEcPMdwWeQzq5h+ioukJbf5g41oCKaczvAL8oF3zcc5tbS44LeBCwEOMHKCW3iRjdr648A6DajibGxiqznhVOX3vcnP0w5PLbW4XASZNq3Ul6/0c4na1pP9s9dIbCrcErs24Que3Qdg7/aL4I1FyU+hXzJjcD8OYfq3a2t2/a2d6+KdDm21qbO03XLyzxQ6xa/fdRCiWGFblLApmQaf/k4kjgE6qoKWGNhai79SsbpgHfHzLpZ98No4PlQG9ZRV2CSAuGcefQxL0q+cQCt3cXrgxDQvFRF1bMabpJWbIZwOlqw+8zpsTB5zJ5+eyhZ78Ey4CfAzf2/qQKw1jMnONywwUpfrASwc9lDlBAKDxqeeyc7X8BiHU2r/RDDffpwLOdjr3Exx5NkMvgZruJ5fdYZBIfY4ZihCtHK0z/KGBP0ehrmo5GuAl4gXlTy24yh1LRiviZrsJNhR2p2Babs/3unj61iMAIxVdB/lYj07YL10nhO+mCTSg2CisSQwcefjZdXTq6eR9gg7H0cCCKgojW5FKJfNIo7JB14cAxlXOarjIj8RaAwHfJT34h27EXP5dGBz65rjZS+z5A6/SuopHXNH8DYT5wb2FCH4YGvVq5VAId+PnOSPSD8FlNbxczrJzzzvGpdVNf9LOpmSAYdqQbw7rH7UpeE/jOGGUYvhWtWlXUfnVTCNT9wMdkgsJ55PpXH5ls5NxIJGanx0dr05al/SVTGtsOGiTwXdx0715PlL22lKFSaNgxK7Pm5AkSk7r4mdveONB1W9mocXM5whRgEYumF7Yze7va3nJ8L3SMVQvRAN+nBZh60CBOZ2u/g42hZF05B7HGrbuB3cMJBgyc4CWvhQ5WBRA3nTw66FmpDsjQkaZBFvmP1fcQOcRjstEAYiNq0L3u4agAEj3rza8O7u7zoFfvihJLP4BwOYpdoFoPLaR0IiynccqO8mOHr+EdddftmIJOr0Y4CeFPSOpKGk/NlDf836k8yNodFxPwECAouYh50x7/9NM6ePUHeXpnNXZ3/l7Ujtl4/h3A5cCbiF7EvOPfHcrZ1RsferQ9l7kgYtr+jLqGXQCBqAuuPaFx66eTfq96QdY23w65WyGU/+/lvyUoHiYWvo7ZxzhF7PtJixzh+F6IvJMpAJYh0RHPuoh6QbRejWnZ/VYjURuZN+XZnr/Xb374zIwX/Axg+tjxLxuYvtasXXri+VuGE2zppt/e7Wn31JgVbju2unY7wP7WqhW3zZ7tjxzIedObgFuGGuwFfKU10z0TYJqeMNMwFKah9gLDAskEzrfbs+mja6MAaiHAxAbuBA4b5JCvTD9r+tyA9Fu1rtv80IS0GzwH0FA1dtuocKxToTZeNb3xsf9PesNXPxDTt8a0ZTuPB5hYNeZ4oOcq8zMP8rl5tb4A+azpcwPSb7LriNteo+MfARioJqALReFm3TCtlppovh+lXwMjQAXv9fTbhrmlJhqfZmPmgDcARKRwVA0pe0tNNE7UtpNAC4CbeKdwgVYZirwVtUO1tjI+BnYJ0nuOCFy3J7aBagGSgto8Yk/iC42w/gvpy138VfQ7ZAAAAABJRU5ErkJggg=="/>
								:
								<Image width={40} height={40} alt="bear market icon" src="data:image/png;base64,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"/>}
							</span>
						</h5>
						<div className={styles.PairPrice}>
							$ {trimPrice( cmcData.symbols[5221].quote.USD.price )}
						</div>
						
					</div>
				</div>
			</div>
			<div className={styles.topExchangeWrapper}>
				<div id="slider" className={styles.topExchange} style={
					{
						gridTemplateColumns:`repeat( ${sWidth}, 1fr )`, 
						animation:`exchange-${sWidth} ${sWidth * 12}s ease-in-out infinite forwards`
					}
				}>
					{Object.values( cmcData.symbols ).filter( ( s, i ) => i < sWidth ).map( ( symbol, key ) => <Pair symbol={symbol} i={key} /> )}
				</div>
				<style jsx>{`
					@KEYFRAMES exchange-multi
					{
					  0% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9";
					  }
					  9.09% {
					    grid-template-areas: "p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10";
					  }
					  18.18% {
					    grid-template-areas: "p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_11";
					  }
					  27.27% {
					    grid-template-areas: "p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_11 p_12";
					  }
					  36.36% {
					    grid-template-areas: "p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_11 p_12 p_13";
					  }
					  45.45% {
					    grid-template-areas: "p_5 p_6 p_7 p_8 p_9 p_10 p_11 p_12 p_13 p_14";
					  }
					  54.54% {
					    grid-template-areas: "p_6 p_7 p_8 p_9 p_10 p_11 p_12 p_13 p_14 p_15";
					  }
					  63.63% {
					    grid-template-areas: "p_7 p_8 p_9 p_10 p_11 p_12 p_13 p_14 p_15 p_16";
					  }
					  72.72% {
					    grid-template-areas: "p_8 p_9 p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6";
					  }
					  81.81% {
					    grid-template-areas: "p_9 p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7";
					  }
					  90.9% {
					    grid-template-areas: "p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8";
					  }
					  100% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9";
					  }
					}

					@KEYFRAMES exchange-11
					{
					  0% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10";
					  }
					  9.09% {
					    grid-template-areas: "p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_0";
					  }
					  18.18% {
					    grid-template-areas: "p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_0 p_1";
					  }
					  27.27% {
					    grid-template-areas: "p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_0 p_1 p_2";
					  }
					  36.36% {
					    grid-template-areas: "p_4 p_5 p_6 p_7 p_8 p_9 p_10 p_0 p_1 p_2 p_3";
					  }
					  45.45% {
					    grid-template-areas: "p_5 p_6 p_7 p_8 p_9 p_10 p_0 p_1 p_2 p_3 p_4";
					  }
					  54.54% {
					    grid-template-areas: "p_6 p_7 p_8 p_9 p_10 p_0 p_1 p_2 p_3 p_4 p_5";
					  }
					  63.63% {
					    grid-template-areas: "p_7 p_8 p_9 p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6";
					  }
					  72.72% {
					    grid-template-areas: "p_8 p_9 p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7";
					  }
					  81.81% {
					    grid-template-areas: "p_9 p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8";
					  }
					  90.9% {
					    grid-template-areas: "p_10 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9";
					  }
					  100% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_10";
					  }
					}

					@KEYFRAMES exchange-10
					{
					  0% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9";
					  }
					  10% {
					    grid-template-areas: "p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_0";
					  }
					  20% {
					    grid-template-areas: "p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_0 p_1";
					  }
					  30% {
					    grid-template-areas: "p_3 p_4 p_5 p_6 p_7 p_8 p_9 p_0 p_1 p_2";
					  }
					  40% {
					    grid-template-areas: "p_4 p_5 p_6 p_7 p_8 p_9 p_0 p_1 p_2 p_3";
					  }
					  50% {
					    grid-template-areas: "p_5 p_6 p_7 p_8 p_9 p_0 p_1 p_2 p_3 p_4";
					  }
					  60% {
					    grid-template-areas: "p_6 p_7 p_8 p_9 p_0 p_1 p_2 p_3 p_4 p_5";
					  }
					  70% {
					    grid-template-areas: "p_7 p_8 p_9 p_0 p_1 p_2 p_3 p_4 p_5 p_6";
					  }
					  80% {
					    grid-template-areas: "p_8 p_9 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7";
					  }
					  90% {
					    grid-template-areas: "p_9 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8";
					  }
					  100% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_9";
					  }
					}

					@KEYFRAMES exchange-9
					{
					  0% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8";
					  }
					  11.11% {
					    grid-template-areas: "p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_0";
					  }
					  22.22% {
					    grid-template-areas: "p_2 p_3 p_4 p_5 p_6 p_7 p_8 p_0 p_1";
					  }
					  33.33% {
					    grid-template-areas: "p_3 p_4 p_5 p_6 p_7 p_8 p_0 p_1 p_2";
					  }
					  44.44% {
					    grid-template-areas: "p_4 p_5 p_6 p_7 p_8 p_0 p_1 p_2 p_3";
					  }
					  55.55% {
					    grid-template-areas: "p_5 p_6 p_7 p_8 p_0 p_1 p_2 p_3 p_4";
					  }
					  66.66% {
					    grid-template-areas: "p_6 p_7 p_8 p_0 p_1 p_2 p_3 p_4 p_5";
					  }
					  77.77% {
					    grid-template-areas: "p_7 p_8 p_0 p_1 p_2 p_3 p_4 p_5 p_6";
					  }
					  88.88% {
					    grid-template-areas: "p_8 p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7";
					  }
					  100% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_8";
					  }
					}

					@KEYFRAMES exchange-5
					{
					  0% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7";
					  }
					  12.5% {
					    grid-template-areas: "p_1 p_2 p_3 p_4 p_5 p_6 p_7 p_0";
					  }
					  25% {
					    grid-template-areas: "p_2 p_3 p_4 p_5 p_6 p_7 p_0 p_1";
					  }
					  37.5% {
					    grid-template-areas: "p_3 p_4 p_5 p_6 p_7 p_0 p_1 p_2";
					  }
					  50% {
					    grid-template-areas: "p_4 p_5 p_6 p_7 p_0 p_1 p_2 p_3";
					  }
					  62.5% {
					    grid-template-areas: "p_5 p_6 p_7 p_0 p_1 p_2 p_3 p_4";
					  }
					  75% {
					    grid-template-areas: "p_6 p_7 p_0 p_1 p_2 p_3 p_4 p_5";
					  }
					  87.5% {
					    grid-template-areas: "p_7 p_0 p_1 p_2 p_3 p_4 p_5 p_6";
					  }
					  100% {
					    grid-template-areas: "p_0 p_1 p_2 p_3 p_4 p_5 p_6 p_7";
					  }
					}
				`}</style>
				{/*<div className={styles.topExchangeSettings}>

				</div>*/}
			</div>
		</>
	);

}

export default Exchange;