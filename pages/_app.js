import App from "next/app";

import UserContext from "../components/context/User";

import Nav from "../components/Nav";

import "../styles/root.css";

import "../styles/globals.css";

import "../styles/card-bg-gradients.css";

export default class resolverApp extends App {
  initialState = {
    userHistory: null,
    userRawHistory: null,
  }

  state = this.initialState;

  store_id = 
  {
    history: "cool-history",
    raw_history: "cool-raw-history",
    favorite: "cool-favorite",
  }

  componentDidMount = () =>
  {
    const userHistory = localStorage.getItem( this.store_id.history );

    if ( userHistory ) this.setState( { 
      userHistory
    } );

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
          rememberVisited: this.rememberVisited, 
          forgetVisited: this.forgetVisited,
          deleteHistory: this.deleteHistory,
        } }>
        
        <Nav />
        <Component {...pageProps} />
      
      </UserContext.Provider>
    );

  }

}
