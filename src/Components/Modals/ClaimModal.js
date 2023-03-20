import React from "react";

import './Modal.scss'

export default class ClaimModal extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
		}
	}

    componentDidMount() {
        
    }

    render() {

        let name = "SKYBLUE"
        let type = "CLAIM T1"
        let claimButton

        claimButton = (
            <button onClick={() => this.props.claimRewardsType(this.props.claimType)} className={"modal-content-buttons_btn " + name}>{type}</button>
        )

        if (this.props.claimType == "all") {
            type = "CLAIM ALL"
            claimButton = (
                <button onClick={() => this.props.claimRewards()} className={"modal-content-buttons_btn " + name}>{type}</button>
            )
        } else if (this.props.claimType == "tier2") {
            type = "CLAIM T2"
            name = "PURPLEGEM"
            claimButton = (
                <button onClick={() => this.props.claimRewardsType(this.props.claimType)} className={"modal-content-buttons_btn " + name}>{type}</button>
            )
        } else if (this.props.claimType == "tier3") {
            type = "CLAIM T3"
            name = "SOLITY"
            claimButton = (
                <button onClick={() => this.props.claimRewardsType(this.props.claimType)} className={"modal-content-buttons_btn " + name}>{type}</button>
            )
        } else if (this.props.claimType == "croge") {
            type = "CLAIM CROGE NODE"
            name = "CROGE NODE"
            claimButton = (
                <button onClick={() => this.props.claimRewardsCroge()} className={"modal-content-buttons_btn " + name}>{type}</button>
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
                        {/* <div className={"modal-content-title " + name}>CLAIM</div>
                        <div className="modal-content-separator"></div> */}
                        <div className="modal-content-buttons">
                            {claimButton}
                        </div>
                        <div className={"modal-content-text " + name}>Claim taxes are automatically applied to your rewards.</div>
                    </div>
                </div>
            </div>
        );
    }
}