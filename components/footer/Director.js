import Poweredby from "./Customlink";

const Director = ( { name, link } ) => (
	<Poweredby link={link}>
		<code>
			{name}
		</code>
		<p>
			/
		</p>
	</Poweredby>
);

export default Director;
