import React from "react";
import { Link, withRouter } from "react-router-dom";


import "./MyNodes.scss"
//import T1_svg from '../Assets/T1.svg';
//import T2_svg from '../Assets/T2.svg';

export default class NodeManager extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            selected: "tier1",
		}
        this.handleChange = this.handleChange.bind(this)
	}

    handleChange(e) {
        console.log("handlechange",e)
        this.setState({
            selected: e,
        })
    }

    handleClaimModalOpen(event) {
        this.props.handleClaimModalOpen(event)
    }

    render() {

        let rewards
        let claiminfo
        let props

        if (this.state.selected === "tier1") {
            props = this.props.tier1
        }
        if (this.state.selected === "tier2") {
            props = this.props.tier2
        }
        if (this.state.selected === "tier3") {
            props = this.props.tier3
        }

        claiminfo = (
            <>
            
            <div className={"nodemanager-content-rewards_infos " + this.state.selected}>
                <div className="nodemanager-content-rewards-info"><p className="nodemanager-content-rewards-info_title">DAILY REWARDS</p><p className="nodemanager-content-rewards-info_text">{Math.floor((props.daily.toString())*100)/100 + " $LDN"}</p></div>
                <div className="nodemanager-content-rewards-info"><p className="nodemanager-content-rewards-info_title">TOTAL REWARDS</p><p className="nodemanager-content-rewards-info_text">0</p></div>
                <div className="nodemanager-content-rewards-info"><p className="nodemanager-content-rewards-info_title">PENDING REWARDS</p><p className="nodemanager-content-rewards-info_text">{Math.floor((props.pending.toString())*100)/100 + " $LDN"}</p></div>
                <div className="nodemanager-content-rewards-info"><p className="nodemanager-content-rewards-info_title">PURCHASED</p><p className="nodemanager-content-rewards-info_text">{props.purchased}</p></div>
                <div className="nodemanager-content-rewards-info"><p className="nodemanager-content-rewards-info_title">CLAIM TAX</p><p className="nodemanager-content-rewards-info_text">{props.claim_tax + "%"}</p></div>
                <div className="nodemanager-content-rewards-info"><p className="nodemanager-content-rewards-info_title">LAST CLAIMED</p><p className="nodemanager-content-rewards-info_text">{props.last_claim}</p></div>
            </div>
            <div className="nodemanager-content-rewards-bottom">
                <div className="nodemanager-content-rewards-bottom_line"></div>
                <button onClick={() => this.handleClaimModalOpen(this.state.selected)} className={"nodemanager-content-rewards-bottom_btn " + this.state.selected}>CLAIM</button>
                <div className="nodemanager-content-rewards-bottom_line"></div>
            </div>
            </>
        )

        rewards = (
            <>
            
            <div className="nodemanager-title">
                        <div className="nodemanager-title_text">
                            DAILY REWARDS
                        </div>
                        <div className="nodemanager-title_line"></div>
                    </div>
                    <div className="nodemanager-content">
                        <div className="nodemanager-content-wrapper_rewards">
                            <div className="nodemanager-content-wrapper_nodeselect">
                                <button onClick={() => this.handleChange("tier1")} className={"nodemanager-nodeselect-btn-tier1 " + this.state.selected}>
                                    SKYBLUE
                                </button>
                                <button onClick={() => this.handleChange("tier2")} className={"nodemanager-nodeselect-btn-tier2 " + this.state.selected}>
                                    PURPLEGEM
                                </button>
                                <button onClick={() => this.handleChange("tier3")} className={"nodemanager-nodeselect-btn-tier3 " + this.state.selected}>
                                    SOLITY
                                </button>
                            </div>
                            {claiminfo}
                        </div>
                    </div>
                    <div className="nodemanager-bottom">
                        <div className="nodemanager-claim-wrapper">
                            <div className="nodemanager-claim-node">
                                <div className="nodemanager-claim-node_infos">
                                    <div className="nodemanager-claim-node_title">SKYBLUE</div>
                                    <div className="nodemanager-claim-node_text">{Math.floor((this.props.tier1.pending.toString())*100)/100 + " $LDN"}</div>
                                </div>
                            </div>
                            <div className="nodemanager-claim-node">
                                <div className="nodemanager-claim-node_infos">
                                    <div className="nodemanager-claim-node_title">PURPLEGEM</div>
                                    <div className="nodemanager-claim-node_text">{Math.floor((this.props.tier2.pending.toString())*100)/100 + " $LDN"}</div>
                                </div>
                            </div>
                            <div className="nodemanager-claim-node">
                                <div className="nodemanager-claim-node_infos">
                                    <div className="nodemanager-claim-node_title">SOLITY</div>
                                    <div className="nodemanager-claim-node_text">{Math.floor((this.props.tier3.pending.toString())*100)/100 + " $LDN"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="nodemanager-bottom-down">
                            <div className="nodemanager-bottom-down-line"></div>
                            <button onClick={() => this.handleClaimModalOpen("all")} className="nodemanager-bottom-down-btn">CLAIM ALL</button>
                            <div className="nodemanager-bottom-down-line"></div>
                        </div>
                    </div>
                    </>
        );

        return (
                
                <div className="nodemanager-wrapper">
                  
                   
                    {rewards}
                </div>
        );
    }
}