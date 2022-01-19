const pointerLogo = hostname => hostname.replace( ".", "↗" ).split().map( c => c.toUpperCase() ).join();

export default pointerLogo;