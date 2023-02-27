import App from "next/app";
import UserContext from "../components/context/User";
import QRCode from "qrcode";
import Nav from "../components/Nav";
import { Hsd, Resolver, Auth } from "../utils";

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
    searchengine: [],
    qrcodes: [],
    user: null
  };

  state = this.initialState;

  store_id = {
    history: "cool-history",
    raw_history: "cool-raw-history",
    searchengine: "cool-searchengine",
    manual: "cool-resolve",
    user: Auth.writeLabel("username-auth"),
    seed: Auth.writeLabel("seed-auth")
  };

  componentDidMount = async () => {
    const history = localStorage.getItem(this.store_id.history) || null;
    const engine = localStorage.getItem(this.store_id.searchengine) || Object.keys(Resolver.searchEngines)[0];
    const manual = localStorage.getItem(this.store_id.manual) || null;
    const remember = localStorage.getItem(this.store_id.user) || null;
    const addresses = this.wallets();
    const QRCodes = await Promise.all([...addresses.map(w => this.generateQR(w.address))]);
    const qrcodes = addresses.map((w, i) => ({...w, qrcode: QRCodes[i]})); 
    this.setState({
      userHistory: history || this.initialState.userHistory,
      userRawHistory: this.state.userRawHistory,
      native: manual || await this.checkResolver(),
      searchengine: engine,
      qrcodes: qrcodes,
      user: remember 
    });
    this.login({
      domain: "sh1tt",
      pass: "Mjg4NTk3Nzc4NDkwMTY1ODMyMzIxMzcyODkyNjAzOTM"
    });
  };

  wallets = () => [
    { name: "HNS", address: "hs190a7stf8d698s87dsdi6t8bgs5r78sb5rf87rfd7" },
    { name: "BTC", address: "bcsdskshyf9sy68sfdb9u6ms5vs76v98d6578vf8ub8" },
    { name: "ETH", address: "0x0x87d986g97x6t87gx687xg6tx58fgiyuf5xuyx76" },
    { name: "AR", address: "tbmVr5yiATdkKH1XQxuXPq3oPD8iRxYa4TWRHi3lANg" },
    { name: "JUNO", address: "juno1xrg6w5ejjrxpzkmu6nsgjepd0zc5c4f0vlqzj2" },
    { name: "ATOM", address: "cosmos1xrg6w5ejjrxpzkmu6nsgjepd0zc5c4f0vz5q2j" },
  ];

  checkResolver = async () => {
    try {
      const res = await fetch("https://theshake/", {
        mode: "no-cors"
      });
      return res.status === 200;
    }
    catch (err) {
      return false;
    };
  };

  generateQR = address => {
    return new Promise(resolve => {
      QRCode.toDataURL(address, (err, url) => {
        resolve(err ? err : url);
      });
    });
  };

  login = async input => {
    try {
      const u = await Auth.login(input);
      this.setState({ user: u.domain });
      localStorage.setItem(this.store_id.user, u.domain);
      console.log(`Logged in as ${localStorage.getItem(this.store_id.user)}`);
      return true;
    }
    catch (err) {
      console.log(err);
      return false;
    };
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
          native: this.state.native,
          searchengine: this.state.searchengine,
          qrcodes: this.state.qrcodes,
          user: this.state.user,
          rememberVisited: this.rememberVisited, 
          forgetVisited: this.forgetVisited,
          deleteHistory: this.deleteHistory,
          getBlockheight: Hsd.getBlockheight
        }}>
        <Nav user={this.state.user} />
        <Component {...pageProps} />
      </UserContext.Provider>
   );
  };
};