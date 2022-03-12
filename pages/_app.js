import App from "next/app";

import UserContext from "../components/context/User";

import Nav from "../components/Nav";

import Footer from "../components/footer";

import "../styles/root.css";

import "../styles/globals.css";

import "../styles/nav.css";

import "../styles/card-bg-gradients.css";

import "../styles/emojipicker.css";

export default class resolverApp extends App {
  initialState = {
    userHistory: null,
    userRawHistory: null,
    userSymbols: [],
    bridgeMode: false
  }

  state = this.initialState;

  store_id = 
  {
    history: "cool-history",
    raw_history: "cool-raw-history",
    used_emoji: "cool-emoji",
    symbols: "cool-symbols",
  }

  componentDidMount = () =>
  {
    const userHistory = localStorage.getItem( this.store_id.history );

    if ( userHistory ) 
    {
      this.setState( { 
        userHistory
      } );
    }

  }

  toggleBridgeMode = () =>
  {
    this.setState( {
      bridgeMode: !this.state.bridgeMode
    })
  }

  storeSymbols = symbols =>
  {
    const v = symbols ? [ ...symbols ].join() : this.getStoreSymbols().join();

    localStorage.setItem( this.store_id.symbols, v );

  }

  getStoreSymbols = () =>
  {
    if ( !localStorage.getItem( this.store_id.symbols ) ) localStorage.setItem( this.store_id.symbols, "1,1027,2010,5426,52,7186,8916,10903,7064,5221,5824,8353,3575,5632" );//"1,5221,8916,1027,7064,8353" );

    const storeSymbols = localStorage.getItem( this.store_id.symbols ).replace( /[\"]/g, "" ) || null;

    return storeSymbols ? [ ...storeSymbols.split( /,/ ) ] : [];

  }

  storeEmoji = emoji =>
  {
    const storeEmojis = this.getStoreEmoji();

    const usedEmoji = storeEmojis ? [ emoji , ...storeEmojis.filter( storeEmoji => storeEmoji != emoji ) ] : [ emoji ];

    localStorage.setItem( this.store_id.used_emoji, usedEmoji.filter( ( e, i ) => i < 30 ).join() );

  }

  getStoreEmoji = () =>
  {
    if ( !localStorage.getItem( this.store_id.used_emoji ) ) localStorage.setItem( this.store_id.used_emoji, "" );

    const storeEmojis = localStorage.getItem( this.store_id.used_emoji ).replace( /[\"]/g, "" ) || null;

    return storeEmojis ? [ ...storeEmojis.split( /,/ ) ] : [];

  }

  rememberVisited = hnsname => 
  {
    const history = localStorage.getItem( this.store_id.history ) || null;

    let hnsnames = history ? [ ...history.split( /,/ ).map( r =>  r.split( ":" )[0] ) ] : [];

    let visits =  history ? [ ...history.split( /,/ ).map( r => parseInt( r.split( ":" )[1] ) ) ] : [];

    if ( hnsnames.indexOf( hnsname ) >= 0 )
    {
      visits[hnsnames.indexOf( hnsname )]++;
    
    }
    else
    {
      hnsnames.push( hnsname );

      visits.push( 1 );
    
    }

    const obj = [];

    hnsnames.forEach( ( hnsname, i ) =>
    {
      obj[hnsname] = visits[i];
    
    } )

    const sorted = Object.keys( obj ).sort( ( a, b ) => obj[b] - obj[a] );

    const coolStringify = ( a, r, v ) => a.map( n => `${n}:${v[r.indexOf( n )]}` ).join();

    const userHistory = coolStringify( sorted, hnsnames, visits );

    const userRawHistory = coolStringify( hnsnames, hnsnames, visits );

    localStorage.setItem( this.store_id.history, userHistory );

    localStorage.setItem( this.store_id.raw_history, userRawHistory );

    this.setState( {
      userHistory,
      userRawHistory,
    } );

  }

  forgetVisited = hnsname =>
  {
    const history = localStorage.getItem( this.store_id.history ) || null;

    if ( !history ) return;

    let hnsnames = [ ...history.split( /,/ ).map( r =>  r.split( ":" )[0] ) ];

    let visits =  [ ...history.split( /,/ ).map( r => parseInt( r.split( ":" )[1] ) ) ];
    
    const target = hnsnames.indexOf( hnsname );

    hnsnames = hnsnames.filter( ( hnsname, key ) => key != target );
    
    visits = visits.filter( ( count, key ) => key != target );
    
    const userHistory = hnsnames.map( ( hnsname, i ) => `${hnsname}:${visits[i]}` ).join();

    localStorage.setItem( this.store_id.history, userHistory );

    this.setState( {
      userHistory
    } );

  }

  deleteHistory = () =>
  {

    localStorage.removeItem( this.store_id.history );
    
    localStorage.removeItem( this.store_id.raw_history );
    
    this.setState( this.initialState );

  }

  render()
  {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={ { 
          userHistory: this.state.userHistory, 
          userRawHistory: this.state.userRawHistory,
          bridgeMode: this.state.bridgeMode, 
          rememberVisited: this.rememberVisited, 
          forgetVisited: this.forgetVisited,
          deleteHistory: this.deleteHistory,
          storeEmoji: this.storeEmoji,
          getStoreEmoji: this.getStoreEmoji,
          storeSymbols: this.storeSymbols,
          getStoreSymbols: this.getStoreSymbols,
          toggleBridgeMode: this.toggleBridgeMode
        } }>
        
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </UserContext.Provider>
    );

  }

}
