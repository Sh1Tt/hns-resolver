import { useState, useEffect } from "react";

import Logo from "./Logo";

import Resolver from "./form/Resolver";

import CMS from "../cms";

import styles from "../styles/Nav.module.css";

function positionNav( scrolltop )
{
	const nav = document.querySelector( `#__nav` );
	
	if ( scrolltop < 196 )
	{
		if ( nav.classList.contains( 'stickyPosition' ) ) nav.classList.remove( 'stickyPosition' );

		if ( !nav.classList.contains( 'topPosition' ) ) nav.classList.add( 'topPosition' );
	
	}
	else
	{
		if ( nav.classList.contains( 'topPosition' ) ) nav.classList.remove( 'topPosition' );

		if ( !nav.classList.contains( 'stickyPosition' ) ) nav.classList.add( 'stickyPosition' );
	
	}

}


const Nav = () => 
{
	const [ scrolltop, setScrolltop, bridgeMode ] = useState( 0 );
	
	function scrollHandler()
	{
		setScrolltop( Math.round( window.scrollY ) );

		positionNav( scrolltop );

	}
	
	useEffect( () =>
	{
		if ( typeof window !== "undefined" )
		{
			window.addEventListener( "scroll", scrollHandler )

			return () => 
			{
				window.removeEventListener( "scroll", scrollHandler )
			}

		}

	}, [ scrolltop ] );

	return (
		<>
			<nav id="__nav" className="topPosition">
				
				<Resolver />
			</nav>
			<Logo text={<><b>{CMS.META.NAME}</b></>} />
		</>
	);

}

export default Nav;