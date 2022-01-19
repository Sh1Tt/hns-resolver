import Poweredby from "./Customlink";

const Organisation = ( { name, link, svg } ) => (
	<Poweredby link={link}>
		{svg}
		<h4>
			{name}
		</h4>
	</Poweredby>
);

export default Organisation;
