import Customlink from "./Customlink";

const Director = ({ name, link }) => (
	<Customlink link={link}>
		<code>
			{name}
		</code>
		<p>
			/
		</p>
	</Customlink>
);

export default Director;