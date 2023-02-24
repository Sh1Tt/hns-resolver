import App from "next/app";
import UserContext from "../components/context/User";
import Nav from "../components/Nav";
import { Hsd, Resolver } from "../utils";

import "../styles/theme.css";
import "../styles/globals.css";
import "../styles/scrollbar.css";
import "../styles/interact.css";
import "../styles/paralax.css";

import "../styles/card-bg-gradients.css";

export default class resolverApp extends App {
  initialState = {
    userHistory: null,
    userRawHistory: null,
    native: false,
    searchengine: []
  };

  state = this.initialState;

  store_id = {
    history: "cool-history",
    raw_history: "cool-raw-history",
    searchengine: "cool-searchengine",
    manual: "cool-resolve"
  };

  componentDidMount = () => {
    const history = localStorage.getItem(this.store_id.history) || null;
    const engine = localStorage.getItem(this.store_id.searchengine) || Object.keys(Resolver.searchEngines)[0];
    const manual = localStorage.getItem(this.store_id.manual) || null;
    const hasResolver = manual || this.test();
    console.log(Resolver.searchEngines)
    this.setState({
      userHistory: history || this.initialState.userHistory,
      userRawHistory: this.state.userRawHistory,
      native: hasResolver,
      searchengine: engine
    }, () => {
      console.log(this.state);
    });
  };

  test = async () => {
    try { 
      const ssl = window.location.protocol === "https";
      const target = ssl ? "https://theshake/" : "http://www.findwaldo/";
      const res = await fetch(`${target}`);
      console.log(res);
      return res.status === 200;
    }
    catch (err) {
      return false;
    }
  };

  rememberVisited = hnsname => {
    const history = localStorage.getItem(this.store_id.history) || null;

    let hnsnames = history ? [...history.split(/,/).map(r => r.split(":")[0]) ] : [];
    let visits =  history ? [...history.split(/,/).map(r => parseInt(r.split(":")[1])) ] : [];

    if (hnsnames.indexOf(hnsname) >= 0) {
      visits[hnsnames.indexOf(hnsname)]++;
    }
    else {
      hnsnames.push(hnsname);
      visits.push(1);
    };
    
    const obj = [];
    
    hnsnames.forEach((hnsname, i) => {
      obj[hnsname] = visits[i];
    });

    const sorted = Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
    
    const coolStringify = (a, r, v) => a.map(n => `${n}:${v[r.indexOf(n)]}`).join();
    
    const userHistory = coolStringify(sorted, hnsnames, visits);
    const userRawHistory = coolStringify(hnsnames, hnsnames, visits);
    
    localStorage.setItem(this.store_id.history, userHistory);
    localStorage.setItem(this.store_id.raw_history, userRawHistory);
    
    this.setState({
      userHistory,
      userRawHistory,
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
      userHistory
    });
  };

  deleteHistory = () => {
    localStorage.removeItem(this.store_id.history);
    localStorage.removeItem(this.store_id.raw_history);
    this.setState(this.initialState);
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider value={{ 
          userHistory: this.state.userHistory, 
          history: this.state.userHistory, 
          userRawHistory: this.state.userRawHistory, 
          rememberVisited: this.rememberVisited, 
          forgetVisited: this.forgetVisited,
          deleteHistory: this.deleteHistory,
          getBlockheight: Hsd.getBlockheight
        }}>
        <Nav />
        <Component {...pageProps} />
      </UserContext.Provider>
   );
  };
};