import { useRef, useEffect } from 'react'

const Canvas = () =>
{
	console.log( 'canvas' )

	const size = { width: 320, height: 74 }

	const fontSize = 56

	const requestIdRef = useRef( null )

	const clockRef = useRef( {
		time: null
	} )

	function updateClock()
	{
		clockRef.current.time = new Date().toLocaleString( 'en-US', { 
			hour: '2-digit', 
			minute: '2-digit' 
		} )
	
	}
	
	function frameRenderer( size, ref )
	{
    	this.clearRect( 0, 0, size.width, size.height )

	    const drawClock = ( t ) =>
	    {
	        this.save()
	        
	        this.font = `${fontSize}px Arial`

	        this.fillStyle = 'darkred'
	        
	        this.fillText( t, 0, fontSize -2 )

	        this.restore()

	    }
	    
		drawClock( ref.time )

	}

	const renderFrame = () =>
	{
		const clock = clockRef.current
		
		const ctx = clock.getContext("2d")
		
		updateClock()


		frameRenderer.call( ctx, size, clock )
		
	}

	
	const tick = () =>
	{
		if ( !clockRef.current ) return;

		renderFrame()
		
		requestIdRef.current = requestAnimationFrame( tick )
	
	}


	useEffect(() =>
	{
		requestIdRef.current = requestAnimationFrame( tick )

		return () =>
		{
			cancelAnimationFrame( requestIdRef.current )

		}

	}, [] )

	
	return ( 
		<>
			<canvas id="canvas" {...size} ref={clockRef} />
		</>
	)

}

export default Canvas