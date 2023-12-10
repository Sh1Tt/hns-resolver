import App from "next/app";
import UserContext from "../components/context/User";
import Nav from "../components/Nav";
import { Resolver } from "../utils";

import "../styles/theme.css";
import "../styles/globals.css";
import "../styles/scrollbar.css";
import "../styles/interact.css";
import "../styles/paralax.css";

import "../styles/card-bg-gradients.css";

const numberOfBackgrounds = 8;

export default class resolverApp extends App {
  initialState = {
    userHistory: null,
    userRawHistory: null,
    native: false,
    searchengine: null,
    consent: null,
    arJwk: null
  };

  state = this.initialState;

  store_id = {
    history: "cool-history",
    raw_history: "cool-raw-history",
    searchengine: "cool-searchengine",
    manual: "cool-resolve",
    consent: "cool-consent",
    arJwk: "cool-arJwk"
  };

  componentDidMount = async () => {
    const history = localStorage.getItem(this.store_id.history)
    || this.initialState.userHistory;
    
    const manual = localStorage.getItem(this.store_id.manual) 
    || this.initialState.native;
    
    const engine = localStorage.getItem(this.store_id.searchengine) 
    || Object.keys(Resolver.searchEngines)[0];

    const consent = localStorage.getItem(this.store_id.consent)
    || this.initialState.consent;

    const arJwk = localStorage.getItem(this.store_id.arJwk)
    || this.initialState.arJwk;

    this.checkResolver();

    const bg = this.randBg();

    this.setState({
      ...this.state,
      userHistory: history,
      native: manual,
      searchengine: engine,
      consent: consent || this.initialState.consent,
      arJwk: arJwk || this.initialState.arJwk,
      bg: bg
    });
  };

  checkResolver = async () => {
    try { 
      const res = await fetch("https://hnschat/favicon.ico", {});
      console.log(res);
      this.setState({
        ...this.state,
        native: res.status === 200
      });
    }
    catch (err) {
      return false;
    };
  };
  
  rememberVisited = hnsname => {
    const history = localStorage.getItem(this.store_id.history) || null;

    let hnsnames = history 
      ? [...history.split(/,/).map(r => r.split(":")[0]) ] 
      : [];
    
    let visits =  history 
      ? [...history.split(/,/).map(r => parseInt(r.split(":")[1])) ]
      : [];

    if (hnsnames.indexOf(hnsname) >= 0) {
      visits[hnsnames.indexOf(hnsname)]++;
    }
    else {
      hnsnames.push(hnsname);
      visits.push(1);
    };
    
    const arr = [];
    
    hnsnames.forEach((hnsname, i) => {
      arr[hnsname] = visits[i];
    });

    const sorted = Object.keys(arr).sort((a, b) => arr[b] - arr[a]);
    
    const coolStringify = (a, r, v) => a.map(n => `${n}:${v[r.indexOf(n)]}`).join();
    
    const userHistory = coolStringify(sorted, hnsnames, visits);
    const userRawHistory = coolStringify(hnsnames, hnsnames, visits);
    
    localStorage.setItem(this.store_id.history, userHistory);
    localStorage.setItem(this.store_id.raw_history, userRawHistory);
    
    this.setState({
      ...this.state,
      userHistory: userHistory,
      userRawHistory: userRawHistory,
    });
  };

  forgetVisited = hnsname => {
    const history = localStorage.getItem(this.store_id.history) || null;
    
    if (!history) 
      return;

    let hnsnames = [ ...history.split(/,/).map(r =>  r.split(":")[0]) ];
    let visits =  [ ...history.split(/,/).map(r => parseInt(r.split(":")[1])) ];
    
    const target = hnsnames.indexOf(hnsname);

    hnsnames = hnsnames.filter((hnsname, key) => key != target);
    visits = visits.filter((count, key) => key != target);
    
    const userHistory = hnsnames.map((hnsname, i) => `${hnsname}:${visits[i]}`).join();

    localStorage.setItem(this.store_id.history, userHistory);

    this.setState({
      ...this.state,
      userHistory: userHistory
    });
  };

  deleteHistory = () => {
    localStorage.removeItem(this.store_id.history);
    localStorage.removeItem(this.store_id.raw_history);
    this.setState({
      ...this.state,
      userHistory: this.initialState.userHistory,
      userRawHistory: this.initialState.userRawHistory
    });
  };

  randBg = () => parseInt(Math.floor(Math.random() * numberOfBackgrounds));

  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider value={{ 
          userHistory: this.state.userHistory,
          native: this.state.native,
          searchengine: this.state.searchengine,
          backgroundSelection: this.state.bg,
          rememberVisited: this.rememberVisited, 
          forgetVisited: this.forgetVisited,
          deleteHistory: this.deleteHistory
        }}>
        <Nav />
        <Component {...pageProps} />
      </UserContext.Provider>
   );
  };
};