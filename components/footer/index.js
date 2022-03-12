import Head from "next/head";

import Link from "next/link";

import Image from "next/image";

import { useState, useEffect } from "react";

import Director from "./Director";

import Organisation from "./Organisation";

import CMS from "../../cms";

import styles from "../../styles/Footer.module.css";

const Customoption = ( v, k ) => process.env.HOST == v ? <option selected key={k} value={v}>{v}</option> : <option selected key={k} value={v}>{v}</option>;

function mirrorLinkHandler( mirror )
{
	const url = `https://${mirror}/`;

	location.href = url;

}

function ping(ip, callback)
{
	if (!this.inUse)
	{
		this.status = 'unchecked';
		
		this.inUse = true;
		
		this.callback = callback;
		
		this.ip = ip;
		
		let _that = this;

		this.img = () => new Image();

		this.img.onload = function ()
		{

			_that.inUse = false;
		
			_that.callback('responded');

		};

		this.img.onerror = function (e)
		{
		
			if (_that.inUse)
			{
				_that.inUse = false;
				_that.callback('responded', e);

			}

		};

		this.start = new Date().getTime();

		this.img.src = "http://" + ip;

		this.timer = setTimeout(function ()
		{
			if (_that.inUse)
			{

				_that.inUse = false;
				
				_that.callback('timeout');

			}

		}, 4400);

	}

};

const Footer = () =>
{
	const initialState = "Checking..";

	const [ serverHealth, setHealth ] = useState( initialState );

	useEffect( () =>
	{
		const healthCheck = async servers =>
		{
			new ping(servers[0], ( status, e ) =>
			{
				console.log( status );

			} )
		};

		healthCheck(["hns.is","rsvr.xyz"]);

	} ), [];

	return (
		<>
			<Head>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.min.js" integrity="sha512-vs7+jbztHoMto5Yd/yinM4/y2DOkPLt0fATcN+j+G4ANY2z4faIzZIOMkpBmWdcxt+596FemCh9M18NUJTZwvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
			</Head>
			<footer className={styles.container}>
				<div className={styles.content}>
					<div className={styles.mirrors}>
						<h4>Mirror</h4>
						<span>
							<i>current mirror: </i>
							<select name="mirrors_available" id="mirrors_available" onChange={e => {mirrorLinkHandler( e.target.value )}}>
								{CMS.META.MIRRORS.map( ( mirror, id ) => mirror == process.env.HOST ? 
									<option key={id} defaultValue={mirror}>{mirror}</option>
									:
									<option key={id} value={mirror}>{mirror}</option>
								)}
							</select>
						</span>
						<h4>Powered by</h4>
						{CMS.FOOTER.POWEREDBY.DIRECTORS.map( ( director, key ) => (
							<div style={{position:'relative',display:'flex',flexDirection:'column'}}
							>
								<span style={{display:'flex',alignItems:'baseline'}}>
									<span style={{width:'32px',height:'32px',position: 'relative',borderRadius:'50%',overflow:'hidden'}}>
										<Image alt={`Avatar for ${director.name}`} layout="fill" src={director.avatar} />
									</span>
									<code>
										{director.name}
									</code>
									/
								</span>
								<Link href={director.link}>
									<a>
										{director.link}
									</a>
								</Link>
								<span>
									{director.role}
								</span>
								<p>
									<span>
										Address:
									</span>
									<code>
										{director.wallet}
									</code>
								</p>
							</div>
						))}

					</div>
					<div className={styles.ringlinks}>
						<h4>Links</h4>
					</div>
					<div className={styles.contact}>
						<h4>Contact</h4>
						<ul data-bind="foreach:servers">
					    	<li> <a href="#" data-bind="text:name,attr:{href: 'http://'+name}">tester</a> <span data-bind="text:status,css:status"></span>

					    	</li>
					    </ul>
		    
					</div>
				</div>
			</footer>
		</>
	);

}

export default Footer;


