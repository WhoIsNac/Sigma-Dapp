import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { ethers } from "ethers";

import ConnectModal from '../Components/Modals/ConnectModal.js'
//import ErrorModal from '../Components/Modals/ErrorModal.js';


//import mobilemenuimage from '../Assets/MobileMenu.jpg';

import WalletConnectProvider from "@walletconnect/web3-provider";

import { configVars } from "../config/config.js";


import './Navbar.scss'

export default class Navbar extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			address: "",
            displayAddress: "",
            isloading: false,
            balance: 0,
            modalOpen: false,
            error: {},
            walletProviderName: "",
            browserWeb3Provider: null,
            serverWeb3Provider: null,
            wcConnector: null,
            wcProvider: null,
            connected: false,
            chainId: 0,
            crogeHolder: 0,
            blockCheck: false,
		}
        this.handleWallet = this.handleWallet.bind(this);
        this.handleMobile = this.handleMobile.bind(this);
        this.handleDisable = this.handleDisable.bind(this);
        this.handleBlocked = this.handleBlocked.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.claimLDN = this.claimLDN.bind(this);
        this.addTokenToMetamask = this.addTokenToMetamask.bind(this);
        this.switchNetwork = this.switchNetwork.bind(this);
        this.handleBlockPublic = this.handleBlockPublic.bind(this);
	}

    componentDidMount() {

        // var wallet = ""
        // if(window.ethereum){
        //     window.ethereum.request({method:'eth_accounts'})
        //         .then(res=>{
        //             console.log("res", res)
        //             if (res.length != 0) {
        //                 console.log(res)
        //                 wallet = res[0]

        //                     this.setState(
        //                         (pre) => ({
        //                             address: wallet,
        //                             displayAddress: wallet.slice(0, 5) + '...' + wallet.slice(38, 42),
        //                             isloading: false
        //                         }),
        //                         () => {
        //                             console.log();
        //                             this.props.walletUpdate(this.state.address)
        //                         }
        //                     );
        //             }
        //         })
        // } 
    }

    delay(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }

    hexToInt(e) {
        const bn = ethers.BigNumber.from(e);
        return parseInt(bn.toString());
    };

    reloadApp() {
        window.location.reload();
    };

    handleBlockPublic() {
        this.setState(
            (pre) => ({
                blockCheck: true,
                error: {msg: "Presale is only open for OG members, whitelisted and Croge Holders at this moment. Please reload the dApp"}
            }),
            () => {
                this.handleModalOpen()
            }
        );
    }

    async handleWallet() {
        try {
            let chainId = await window.ethereum.request({ method: "eth_chainId" });
            if (!(chainId === configVars.rpcNetwork_mainnet.chainIdHex)) {
              await this.switchNetwork();
              await this.delay(2000);
              return;
            }
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
        
            // It is possible to subscribe to events chainChanged,
            // accountsChanged or disconnect,
            // and reload the Dapp whenever one of these events occurs
            window.ethereum.on("chainChanged", this.reloadApp);
            window.ethereum.on("accountsChanged", this.reloadApp);
            window.ethereum.on("disconnect", this.reloadApp);
            const web3pro =  new ethers.providers.Web3Provider(window.ethereum)
        
            this.setState({
              walletProviderName: "metamask",
              address: accounts[0],
              displayAddress: accounts[0].slice(0, 5) + '...' + accounts[0].slice(38, 42),
              browserWeb3Provider: web3pro,
              serverWeb3Provider: new ethers.providers.JsonRpcProvider(
                configVars.rpcNetwork_mainnet.rpcUrl
              ),
              connected: true,
              chainId: this.hexToInt(
                await window.ethereum.request({ method: "eth_chainId" })
              ),
            });
            
            this.props.walletUpdate(accounts[0], web3pro)
          } catch (e) {
            window.alert(e);
            return;
        }
    }

  

    async handleMobile() {
        try {
            // Reset cache
            localStorage.clear();
            const provider = new WalletConnectProvider({
                rpc: {
                    [configVars.rpcNetwork_mainnet.chainId]:
                    configVars.rpcNetwork_mainnet.rpcUrl,
                },
                chainId: configVars.rpcNetwork_mainnet.chainId,
            });
            await provider.enable();
            const ethersProvider = new ethers.providers.Web3Provider(provider);
            if (!(provider.chainId === configVars.rpcNetwork_mainnet.chainId)) {
              window.alert(
                "Switch your Wallet to blockchain network " +
                  configVars.rpcNetwork_mainnet.chainName
              );
              return;
            }
            // Subscribe to events that reload the app
            provider.on("accountsChanged", this.reloadApp);
            provider.on("chainChanged", this.reloadApp);
            provider.on("disconnect", this.reloadApp);

            this.setState({
                walletProviderName: "walletconnect",
                address: (await ethersProvider.listAccounts())[0].toLowerCase(),
                browserWeb3Provider: ethersProvider,
                serverWeb3Provider: new ethers.providers.JsonRpcProvider(
                    configVars.rpcNetwork_mainnet.rpcUrl
                ),
                wcProvider: provider,
                connected: true,
                chainId: provider.chainId,
            });
            await this.props.walletUpdate((await ethersProvider.listAccounts())[0], ethersProvider)
        } catch (e) {
            console.log(e);
            return;
        }
    }

    async switchNetwork() {
        try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: configVars.rpcNetwork_mainnet.chainIdHex }],
            });
          } catch (e) {
            console.log(e);
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: configVars.rpcNetwork_mainnet.chainIdHex,
                  chainName: configVars.rpcNetwork_mainnet.chainName,
                  rpcUrls: [configVars.rpcNetwork_mainnet.rpcUrl],
                  nativeCurrency: configVars.rpcNetwork_mainnet.nativeCurrency,
                  blockExplorerUrls: [configVars.rpcNetwork_mainnet.blockExplorerUrl],
                },
              ],
            });
          }
    }

    async addTokenToMetamask() {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                  address: "0x97cfBdf107468E88E80929AFE085541d4725d4ff", // The address that the token is at.
                  symbol: "LDN", // A ticker symbol or shorthand, up to 5 chars.
                  decimals: 18, // The number of decimals in the token
                  image: "https://cdn.discordapp.com/attachments/688818836622802969/1007002336129978549/gif-token-ldn.gif", // A string url of the token logo
                },
              },
        });
        } catch (e) {
            console.log(e)
        }
    }

    handleModalOpen() {
        this.props.openModal()
        this.setState(
            (pre) => ({
                modalOpen: true
            }),
            () => {
                console.log("test")
            }
        );
    }

    async claimLDN() {
        let res = await this.props.ldn.claimLDN(ethers.utils.parseEther("500"));
        let tx = await res.wait()
        await this.props.loadBalance()
        console.log("RES CLAIM", tx)
    }

    handleModalClose() {
        this.setState(
            (pre) => ({
                modalOpen: false
            }),
            () => {
                console.log()
            }
        );
        this.props.closeModal()
        
    }



    handleDisable(e) {
        if (!this.state.displayAddress) {
            e.preventDefault();
        }
    }

    handleBlocked(e) {
        e.preventDefault();
    }

    render () {

        let headerMenuInteraction
        let headerMenu
        let hasWallet = ""
        let connectModal
        let post
        let logo

        if (this.state.displayAddress) {
            headerMenuInteraction = (
                <>
                <div className="header-menu-interaction">
                    <button className="wallet-button_token">Token Price : {Math.floor(this.props.tokenPrice * 10000) / 10000} $</button>
                    <button className="wallet-button_token">{Math.floor(this.props.balance * 1000) / 1000} $SIG</button>
                    <button onClick={() => this.handleModalOpen()} className="wallet-button">{this.state.displayAddress}</button>
                </div>
                </>
            );
            hasWallet = "hasWallet"
        } else {
            headerMenuInteraction = (
                <>
                <div className="header-menu-interaction">
                    <button onClick={() => this.handleModalOpen()} className="test-btn"><span>Connect to dApp</span></button>
                </div>
                </>
            );
        }

        if (this.state.modalOpen && !this.state.error.msg) {
            connectModal = <ConnectModal {...this.state} handleBlockPublic={this.handleBlockPublic} addTokenToMetamask={this.addTokenToMetamask} handleWallet={this.handleWallet} crogeHolder={this.props.crogeHolder}  handleMobile={this.handleMobile} switchNetwork={this.switchNetwork} handleModalClose={this.handleModalClose} claimLDN={this.claimLDN} />
        }

        if (this.state.modalOpen && this.state.error.msg) {
           // connectModal = <ErrorModal {...this.state.error} block={this.state.blockCheck} handleModalClose={this.handleModalClose}/>
        }

   

        headerMenu = (
            <div className="header-menu">
                <NavLink exact to="/" activeClassName="selected"><div className="menu-link is-active navpage-1">Home</div></NavLink>
                <div className={"navbar-dapp-control " + hasWallet}>
                    <NavLink onClick={() => this.handleDisable()} to="/buynodes" activeClassName="selected"><div className="menu-link  navpage-2">Buy Nodes</div></NavLink>
                    <NavLink onClick={() => this.handleDisable()} to="/mynodes" activeClassName="selected"><div className="menu-link navpage-4">My Nodes</div></NavLink>
                    <NavLink onClick={() => this.handleDisable()} to="/token" activeClassName="selected"><div className="menu-link navpage-5">$SIG Token</div></NavLink> {/* TODO : notify pour les petits mots sans right */}
                    {/* <NavLink onClick={() => this.handleBlocked()} to="/blog" activeClassName="selected"><div className="menu-link notify navpage-6">Blog</div></NavLink> */}
                </div>
            </div>
        )

        if (this.props.width > 768) {
            logo = (
              <p>LOGO</p>
            )
        } else {
            logo = (
                <p>LOGO</p>
            )
        }

        if (this.props.width > 1408) {
            post = (
                <div className="header">
                    {logo}
                    {headerMenu}
                    {headerMenuInteraction}
                    
                </div>
            )
        } else {
            post = (
                <>
                <div className="header">
                    {logo}
                    {headerMenuInteraction}
                    
                </div>
                <div className="header">
                    {headerMenu}
                </div>
                </>
            )
        }

        return (
            <>
              {post} 
              {connectModal}
            </>
        )
    }
}
