const dynamicLogo = hostname => hostname.replace( ".", "↗" ).split().map( char => char.toUpperCase() ).join()

export default dynamicLogo