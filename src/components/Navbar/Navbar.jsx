import { useWeb3React } from "@web3-react/core";
import React, {useState} from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import "./Navbar.css";

const Navbar = () => {
  const [wallet,setWalllet] = useState();
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5],
  });

  const { account, activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      if (window.ethereum) {
        setWalllet(true)
        window.alert("Connected");
        console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
      } else {
        window.alert("No Web3 Wallet Found, Use web3 based Browser");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="nav-bg">
      <h1 className="logo">LEDU</h1>
      <button
        className={wallet ? "connected-wallet" : "connect-wallet-btn"}
        onClick={() => connect()}
      >
        {wallet ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Navbar;
