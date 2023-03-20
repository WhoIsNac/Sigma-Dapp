import React from "react";
import { Link, withRouter } from "react-router-dom";

import { ethers } from 'ethers'

import './Modal.scss'

export default class BuyModal extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            buyState: "disabled",
		}
        this.handleApprove = this.handleApprove.bind(this)
        this.buyWithLdn = this.buyWithLdn.bind(this)
        this.buyWithCroge = this.buyWithCroge.bind(this)
	}

    componentDidMount() {
        
    }

    async handleApprove() {
        let price = (Math.round(this.props.inputValue / 10) * 130000).toString()
        console.log(price)
        await this.props.crogecoin.approve("0x97cfBdf107468E88E80929AFE085541d4725d4ff", ethers.utils.parseEther(price))

        this.setState(
            (pre) => ({
                buyState: ""
            }),
            () => {
            }
        );
    }

    async buyWithLdn() {

        try{
            //let res = await this.props.ldn.createNodeWithTokens("Tier Croge", Math.round(this.props.inputValue / 10))
            //let tx = await res.wait().then(this.props.closeModal())
            this.props.loadBalance()
            this.props.loadData()
           // console.log("res createnode tx", tx);
           console.log("in buy with");
        } catch(e) {
            if (e.error === undefined) {
                console.log("spotted")
            } else {
                this.props.openModal()
                this.setState({error: {msg: e.error.data.message}})
                console.log("ERROR FROM CONTRACT", e.error.data.message)
            }
        }
    }

    async buyWithCroge() {
        let price = ((130000 * Math.round(this.state.inputValue/10))).toString()
        //let res = await this.props.ldn.createNodeWithSpecToken("Tier Croge", Math.round(this.props.inputValue / 10),"0xC4a174cCb5fb54a6721e11e0Ca961e42715023F9");
       //let tx = await res.wait().then(this.props.closeModal())
        this.props.loadBalance()
        this.props.loadData()
        this.setState(
            (pre) => ({
                buyState: "disabled"
            }),
            () => {
            }
        );
    }

    render() {

        let name
        let price
        let specText = "Claim Fees"
        let specContent
        let rate

        let antidisabled

        if (this.state.buyState == "disabled") {
            antidisabled = ""
        } else {
            antidisabled = "disabled"
        }

        let buyButtons

        if (this.props.node == "croge") {
            name = "CROGE NODE"
            price = 75
            specText = "Croge Price"
            specContent = Math.round(this.props.inputValue / 10) * 130000 + " $CROGE"
            rate = this.props.displayDaily
            buyButtons = (
                <>
                <button onClick={this.buyWithLdn} className="modal-content-buttons_btn ">buy with $ldn</button>
                <div className="modal-content-separator"></div>
                <button onClick={this.handleApprove} className={"modal-content-buttons_btn approve " + antidisabled}>approve</button>
                <button onClick={this.buyWithCroge} className={"modal-content-buttons_btn " + this.state.buyState}>buy with $croge</button>
                </>
            )
        } else if (this.props.node == "tier1") {
            name = "SKYBLUE"
            price = this.props.selectedPrice
            specContent = this.props.selectedTaxes + "%"
            rate = this.props.selectedRate
            buyButtons = (
                <>
                    <button onClick={this.props.createNodes} className={"modal-content-buttons_btn " + name}>buy {Math.round(this.props.inputValue / 10)}</button>
                </>
            )
        } else if (this.props.node == "tier2") {
            name = "PURPLEGEM"
            price = this.props.selectedPrice
            specContent = this.props.selectedTaxes + "%"
            rate = this.props.selectedRate
            buyButtons = (
                <>
                    <button onClick={this.props.createNodes} className={"modal-content-buttons_btn " + name}>buy {Math.round(this.props.inputValue / 10)}</button>
                </>
            )
        } else {
            name = "SOLITY"
            price = this.props.selectedPrice
            specContent = this.props.selectedTaxes + "%"
            rate = this.props.selectedRate
            buyButtons = (
                <>
                    <button onClick={this.props.createNodes} className={"modal-content-buttons_btn " + name}>buy {Math.round(this.props.inputValue / 10)}</button>
                </>
            )
        }

        let close = (
            <div className="modal-close" >
                <button style={{background: "none", border: "none"}} onClick={() => this.props.handleModalClose()}>
                <svg width="24" className="modal-close_svg" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
                </button>
            </div>
        )

        return (
            <div className="modal-container">
                <div className="modal-wrapper">
                    {close}
                    <div className="modal-content">
                        <div className={"modal-content-title " + name}>BUY {name}</div>
                        <div className="modal-content-separator"></div>
                        <div className={"modal-content-text " + name}>
                            <div className="modal-content-text_title">Number</div>
                            <div className={"modal-content-text_number " + name}>{Math.round(this.props.inputValue / 10)}</div>
                        </div>
                        <div className={"modal-content-text " + name}>
                            <div className="modal-content-text_title">LDN Price</div>
                            <div className={"modal-content-text_number " + name}>{Math.round(this.props.inputValue / 10) * price} $LDN</div>
                        </div>
                        <div className={"modal-content-text " + name}>
                            <div className="modal-content-text_title">{specText}</div>
                            <div className={"modal-content-text_number " + name}>{specContent}</div>
                        </div>
                        <div className={"modal-content-text " + name}>
                            <div className="modal-content-text_title">Reward Rates</div>
                            <div className={"modal-content-text_number " + name}>{Math.round((Math.round(this.props.inputValue / 10) * rate) * 100) / 100} $LDN /DAY</div>
                        </div>
                        <div className="modal-content-buttons">
                            {buyButtons}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}