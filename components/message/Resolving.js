const ShakeHandsAnimation = () => ( 
	<style>{`
		@KEYFRAMES shakehands
		{
			0%
			{
				text-shadow: 1px 1px 13px white;
			}
			100%
			{
				text-shadow: 3px 3px 33px white;
				filter: brightness( 1.75 );
			}
		}
		#submit-icon
		{
			animation: shakehands .56s linear infinite;
		}
	`}</style>
);

export default ShakeHandsAnimation;