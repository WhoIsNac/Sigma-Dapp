import logo from './logo.svg';
import './App.scss';

import { Route, HashRouter, Switch, Routes, BrowserRouter } from 'react-router-dom'

import Home from './Home/Home.js';
import Presale from './BuyNode/Presale.js';
import MyNodes from './MyNodes/MyNodes.js';


import React from 'react'
import Navbar from './Navbar/Navbar.js';
import { ethers } from "ethers";


import LDNAbi from './Contracts/contractsData/LoadedFinal.json';
import LDNAddress from './Contracts/contractsData/LoadedFinal-address.json';

import NodeHandlerAbi from './Contracts/contractsData/NodeHandlerV3.json';
import NodeHandlerAddress from './Contracts/contractsData/NodeHandlerV3-address.json';

export default class App extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			wallet: "",
			displayWallet: "",
			provider: null,
			ldn: null,
			nodeHandler: null,
			crogeNft: null,
			balance: 0,
			openModal: "",
			width: 0,
			height: 0,
			videoLoop: 1,
			crogeHolder: 0,
			nftHandler: null,
			usdc: null,
			crogecoin: null,
			tokGet: null,
			tokenPrice: 0,
		}
    this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
    this.walletUpdate = this.walletUpdate.bind(this)
    this.loadContract = this.loadContract.bind(this)
    this.loadNodeHandler = this.loadNodeHandler.bind(this)
    /*
		this.walletUpdate = this.walletUpdate.bind(this)
		this.loadNodeHandler = this.loadNodeHandler.bind(this)
		this.loadCroge = this.loadCroge.bind(this)
		this.loadBalance = this.loadBalance.bind(this)
		this.openModal = this.openModal.bind(this)
		this.getWindowDimensions = this.getWindowDimensions.bind(this)
		this.changeVideoState = this.changeVideoState.bind(this)
		this.loadNftHandler = this.loadNftHandler.bind(this)
		this.loadUSDC = this.loadUSDC.bind(this)
		this.loadCrogeCoin = this.loadCrogeCoin.bind(this)
		this.loadTokGet = this.loadTokGet.bind(this)
    */
	}

  openModal() {
		this.setState(
			(pre) => ({
				openModal: "is-active"
			}), () => {
				console.log("Modal opened");
			}
		);
	}

  closeModal() {
		this.setState(
			(pre) => ({
				openModal: ""
			}), () => {
				console.log("Modal closed");
			}
		);
	}

  async walletUpdate(e, provider) {

		console.log("tttesssst2")

		const signer = provider.getSigner();

		console.log(await provider.listAccounts());
		
		this.setState(
			(pre) => ({
				wallet: e,
				isloading: false,
				provider: provider,
			}),
			() => {
				console.log("LDN Contract Loaded")
        
				this.loadContract(signer)
				this.loadNodeHandler(signer)

		/*
				this.loadCroge(signer)
				this.loadNftHandler(signer);
				this.loadUSDC(signer);
				this.loadCrogeCoin(signer);
				this.loadTokGet(signer);
        */
			}
		);
	}

  async loadBalance() {
		const res = await this.state.ldn.balanceOf(this.state.wallet)
		//let tokenToUsdc = await this.state.tokGet._getOutput("0x97cfbdf107468e88e80929afe085541d4725d4ff", "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",ethers.utils.parseUnits("1",18));
		//this.handleCrogeHolder()
		this.setState(
			(pre) => ({
				balance: Math.floor(ethers.utils.formatEther(res)*100)/100,
			//	tokenPrice: ethers.utils.formatUnits(tokenToUsdc, 6)
			}), () => {
				console.log("Balance updated");
			}
		);
	}

	loadContract(e) {
		this.setState(
			(pre) => ({
				ldn: new ethers.Contract(LDNAddress.address, LDNAbi.abi, e),
			}),
			() => {
				this.loadBalance()
			}
		);
	}

	loadNodeHandler(e) {
		this.setState(
			(pre) => ({
				nodeHandler: new ethers.Contract(NodeHandlerAddress.address, NodeHandlerAbi.abi, e)
			}),
			() => {
				this.loadBalance()
			}
		);
	}

  render() {

    let post;
    let web;
    web = (

			<div className="app">
										<Navbar {...this.state} closeActivities={this.closeActivities} loadBalance={this.loadBalance} walletUpdate={this.walletUpdate} changeVideoState={this.changeVideoState} openModal={this.openModal} closeModal={this.closeModal}/>
				<div className="wrapper">
					<Routes>
						<Route path="/" element={<Home />} />		
						<Route path="/buynodes" element={<Presale {...this.state}   loadBalance={this.loadBalance} walletUpdate={this.walletUpdate} openModal={this.openModal} closeModal={this.closeModal} />} />		
						<Route path="/mynodes" element={<MyNodes {...this.state}  loadBalance={this.loadBalance} walletUpdate={this.walletUpdate} openModal={this.openModal}  closeModal={this.closeModal} />} />		


					</Routes>

				</div>
				<div className={"overlay-app " + this.state.openModal}></div>
			</div>
    )


  
  post = web
  return(

    <BrowserRouter>{post}</BrowserRouter>
  );


  }

}

