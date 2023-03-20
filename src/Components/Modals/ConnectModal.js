import React from "react";
//import { ethers } from "ethers";
//import ToText from "../../Tools/ToText.js";
//import moment from "moment";
//import { Link, withRouter } from "react-router-dom";

//import {ogs, wl} from '../../Navbar/env.js';

//import MetaMaskIcon from '../../Assets/MetaMaskIcon.png'
//import CdcIcon from '../../Assets/CdcIcon.png'
//import walletConnectIcon from '../../Assets/walletConnect.png'
//import LeftArrow from '../../Assets/LeftArrow.png'
//import pp_img from '../../Assets/Nodian-pp.png'

import './Modal.scss'

export default class ConnectModal extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            connect: true,
		}
        this.displayInfo = this.displayInfo.bind(this)
	}

    handleConnect() {
        this.setState({connect: !this.state.connect})
    }

    displayInfo() {
        console.log(this.props)
    }

    render() {

        let role = "Loaded Nodes user"
        let address = this.props.address ? this.props.address : ""



        let blockchain = (
            <>
            <div className="modal-content_section">
                <div className="modal-content_section_blockchain">
                    <button className="modal-close-btn" onClick={() => this.handleConnect()}>
                    LeftArrow
                    </button>
                    <p className="modal-content_role">{role}</p>
                </div>
                <div className="separator_line"></div>
                {this.props.walletProviderName == "metamask" ? 
                 <button onClick={() => this.props.handleWallet()} className="modal-content-button_blockchain_valid modal-content_text">METAMSK ICON</button>
                : 
                <button onClick={() => this.props.handleWallet()} className="modal-content-button_blockchain modal-content_text">METAMSK ICON</button>
                }
                </div>
            </>
        )

        let connect = (
            <>
            <div className="modal-content_section">
                <p className="modal-content_role">{role}</p>
                <button onClick={() => this.handleConnect()} className="modal-content-button modal-content_text">{this.props.displayAddress ? this.props.displayAddress : "Connect Wallet"}</button>
                <div className="separator_line"></div>
                <button onClick={() => this.props.addTokenToMetamask()} className="modal-content-button modal-content_text">Add LDN to MM</button>
            </div>
            <h5 className="modal-content_alert">
                Report any problems on our telegram.
            </h5>
            </>
        )

        let post = (
            <>
            <div className="modal-container">
                <div className="modal-wrapper_profile-top">
                    <div className="modal-close-profile" >
                        <button className="modal-close-btn" onClick={() => this.props.handleModalClose()}>
                        <svg width="24" className="modal-close_svg" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M15 9l-6 6M9 9l6 6" />
                        </svg>
                        </button>
                    </div>
                </div>
                <div className="modal-wrapper_profile-bottom">
                    <div className="modal-content">
                        <div className="modal-content-pp-box">
                           <p>pp_img</p>
                        </div>
                            {this.state.connect ? connect : blockchain}
                    </div>
                </div>
            </div>
            </>
        )

        return (
            post
        );
    }
}