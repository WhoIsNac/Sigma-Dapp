import React from 'react'
import { ethers } from 'ethers'



import './Buynodes.scss'
import BuyModal from '../Components/Modals/BuyModal';

export default class Presale extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
            inputValue: 50,
            inputPrice: 200,
            selectedNode: "tier1",
            selectedPrice: 40,
            selectedTaxes: 20,
            selectedRate: 0.4,
            chosen: 0,
            openModal: false,
            error: {}
		}
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.createNodes = this.createNodes.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
	}

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    componentDidMount() {
        this.delay(500).then(() => this.setState({isLoading: false}));
    }

    handleChange(event) {
        let value = event.target.value
        let price = Math.round(value/10) * this.state.selectedPrice
        this.setState({inputValue: value, inputPrice: price});
    }

    handleClick(e) {
        if (e == 1) {
            this.setState({selectedNode: "tier1", selectedPrice: 40, selectedTaxes: 20, selectedRate: 0.4, chosen: 1, inputPrice: (Math.round(this.state.inputValue/10) * 40)})
        }
        if (e == 2) {
            this.setState({selectedNode: "tier2", selectedPrice: 60, selectedTaxes: 17, selectedRate: 0.63, chosen: 2, inputPrice: (Math.round(this.state.inputValue/10) * 60)})
        }
        if (e == 3) {
            this.setState({selectedNode: "tier3", selectedPrice: 90, selectedTaxes: 15, selectedRate: 1, chosen: 3, inputPrice: (Math.round(this.state.inputValue/10) * 90)})
        }

    }

    async createNodes() {
        let tier
        let price

        if (this.state.selectedNode === "tier1") {
            tier = "Tier 1"
            price = ((40 * Math.round(this.state.inputValue/10)) + (0.05 * Math.round(this.state.inputValue/10))).toString()
        } else if (this.state.selectedNode === "tier2") {
            tier = "Tier 2"
            price = ((60 * Math.round(this.state.inputValue/10)) + (0.05 * Math.round(this.state.inputValue/10))).toString()
        } else if (this.state.selectedNode === "tier3") {
            tier = "Tier 3"
            price = ((90 * Math.round(this.state.inputValue/10)) + (0.05 * Math.round(this.state.inputValue/10))).toString()
        }

        console.log("tentative d'achat de " + Math.round(this.state.inputValue/10) + " node de tier " + tier)

        try{
            console.log(price)
            let res = await this.props.ldn.createNodeWithTokens(tier, Math.round(this.state.inputValue/10))
            let tx = await res.wait().then(this.props.closeModal())
            this.props.loadBalance()
            console.log(Math.round(this.state.inputValue/10), "de", tier, " & result createnode", res);
            console.log("res createnode tx", tx);
            this.loadData()
        } catch(e) {
            console.log(e)
        }
    }

    handleModalClose() {
        this.setState(
            (pre) => ({
                error: {},
                openModal: false
            }),
            () => {
                this.props.closeModal()
            }
        );
    }

    handleModalOpen() {
        this.setState(
            (pre) => ({
                error: {},
                openModal: true
            }),
            () => {
                this.props.openModal()
            }
        );
    }

    render() {

        let post
        let errorModal
        let dnone
        let chosen1
        let chosen2
        let chosen3

        if (this.props.width > 400) {
            dnone = ""
        } else {
            dnone = "d-none"
        }

     

        if (this.state.chosen == 1) {
            chosen1 = "chosen"
            chosen2 = ""
            chosen3 = ""
        } if (this.state.chosen == 2) {
            chosen1 = ""
            chosen2 = "chosen"
            chosen3 = ""
        } if (this.state.chosen == 3) {
            chosen1 = ""
            chosen2 = ""
            chosen3 = "chosen"
        }

        let buyModal

        if (this.state.openModal) {
            
            buyModal = (
                <>
                    <BuyModal {...this.state} node={this.state.selectedNode} createNodes={this.createNodes} handleModalClose={this.handleModalClose}></BuyModal>
                </>
            )
            
        } else {
            buyModal = (<></>)
        }

        
            post = (
                <>
                <div className="content-wrapper-header presale">
                        <div className="content-wrapper-box">
                            <div className="content-wrapper-context">
                                <h3 className="img-content">
                                LOGO
                                </h3>
                                <div className="content-text">
                                    <div>
                                    Investors who purchased Loaded Nodes will receive passive rewards in the form of $LDN tokens. This reward comes from the reward pool, so each node holder will be paid from this pool. In order to make Loaded Nodes accessible to everyone, there will be different tiers of Nodes at scaled prices. 
                                    </div>
                                    <div>
                                    The daily reward depends on the respective tier level purchased.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="app-cards">
                            <div className={"app-card tier1 " + chosen1}>
                                <div className='presale-section-cadre tier1'>
                                    <p>T1 NODE IMAGE</p>
                                    <div className="presale-section-nodes-text">
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Total Number</p><p className="presale-section-nodes-text-subtitle"><strong>50 000</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Lifetime</p><p className="presale-section-nodes-text-subtitle"><strong>300 DAYS</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Price</p><p className="presale-section-nodes-text-subtitle"><strong>40 $LDN</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Reward rates</p><p className="presale-section-nodes-text-subtitle"><strong>0,4 $LDN /DAY</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Claim Fees</p><p className="presale-section-nodes-text-subtitle"><strong>20%</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">ROI after Taxes</p><p className="presale-section-nodes-text-subtitle"><strong>125 DAYS</strong></p></div>
                                    </div>
                                </div>
                                <div className="app-card__subline"></div>
                                <div className="app-card-buttons">
                                    <p className='presale-section-nodes-tierinfo'><strong>SKYBLUE</strong><br/>TIER 1</p>
                                    <div className={'presale-section-nodes-separator ' + dnone}></div>
                                    <p className={'presale-section-nodes-tierinfo ' + dnone}><strong>40 $LDN</strong></p>
                                    <div className={'presale-section-nodes-separator ' + dnone}></div>
                                    <button onClick={() => this.handleClick(1)} className="content-button button-select-nodes">SELECT</button>
                                    
                                </div>
                            </div>
                            <div className={"app-card tier2 " + chosen2}>
                                <div className='presale-section-cadre tier1'>
                                    <p>T2 NODE IMAGE</p>
                                    <div className="presale-section-nodes-text">
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Total Number</p><p className="presale-section-nodes-text-subtitle"><strong>35 000</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Lifetime</p><p className="presale-section-nodes-text-subtitle"><strong>300 DAYS</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Price</p><p className="presale-section-nodes-text-subtitle"><strong>60 $LDN</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Reward rates</p><p className="presale-section-nodes-text-subtitle"><strong>0,63 $LDN /DAY</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Claim Fees</p><p className="presale-section-nodes-text-subtitle"><strong>17%</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">ROI after Taxes</p><p className="presale-section-nodes-text-subtitle"><strong>115 DAYS</strong></p></div>
                                    </div>
                                </div>
                                <div className="app-card__subline"></div>
                                <div className="app-card-buttons">
                                    <p className='presale-section-nodes-tierinfo'><strong>PURPLEGEM</strong><br/>TIER 2</p>
                                    <div className={'presale-section-nodes-separator ' + dnone}></div>
                                    <p className={'presale-section-nodes-tierinfo ' + dnone}><strong>60 $LDN</strong></p>
                                    <div className={'presale-section-nodes-separator ' + dnone}></div>
                                    <button onClick={() => this.handleClick(2)} className="content-button button-select-nodes">SELECT</button>
                                    
                                </div>
                            </div>
                            <div className={"app-card tier3 " + chosen3}>
                                <div className='presale-section-cadre tier1'>
                                    <p>T3 NODE IMAGE</p>
                                    <div className="presale-section-nodes-text">
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Total Number</p><p className="presale-section-nodes-text-subtitle"><strong>15 000</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Lifetime</p><p className="presale-section-nodes-text-subtitle"><strong>300 DAYS</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Price</p><p className="presale-section-nodes-text-subtitle"><strong>90 $LDN</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Reward rates</p><p className="presale-section-nodes-text-subtitle"><strong>1 $LDN /DAY</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">Claim Fees</p><p className="presale-section-nodes-text-subtitle"><strong>15%</strong></p></div>
                                        <div className="presale-section-nodes-text-bloc tier1"><p className="presale-section-nodes-text-title">ROI after Taxes</p><p className="presale-section-nodes-text-subtitle"><strong>105 DAYS</strong></p></div>
                                    </div>
                                </div>
                                <div className="app-card__subline"></div>
                                <div className="app-card-buttons">
                                    <p className='presale-section-nodes-tierinfo'><strong>SOLITY</strong><br/>TIER 3</p>
                                    <div className={'presale-section-nodes-separator ' + dnone}></div>
                                    <p className={'presale-section-nodes-tierinfo ' + dnone}><strong>90 $LDN</strong></p>
                                    <div className={'presale-section-nodes-separator ' + dnone}></div>
                                    <button onClick={() => this.handleClick(3)} className="content-button button-select-nodes">SELECT</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="presale-section-buy-infos">
                            <div className="presale-section-buy-infobox">
                                <span className="presale-section-buy-text">Nodes</span>
                                <span className={this.state.selectedNode + " presale-section-buy-value"} id="nodes_quantity_value"><strong>{Math.round(this.state.inputValue / 10)}</strong></span>
                            </div>
                            <div className="presale-section-buy-infobox">
                                <span className="presale-section-buy-text">LDN Value</span>
                                <span className={this.state.selectedNode + " presale-section-buy-value"} id="nodes_cro_value"><strong>{this.state.inputPrice}</strong></span>
                            </div>
                            <div className="presale-section-buy-infobox">
                                <span className="presale-section-buy-text">Daily Reward</span>
                                <span className={this.state.selectedNode + " presale-section-buy-value"} id="nodes_usd_value"><strong>{Math.floor(Math.round(this.state.inputValue / 10) * this.state.selectedRate * 100)/100} $LDN</strong></span>
                            </div>
                            <div className="presale-section-buy-infobox">
                                <span className="presale-section-buy-text">Fees Taxes</span>
                                <span className={this.state.selectedNode + " presale-section-buy-value"} id="nodes_fees_value"><strong>{this.state.selectedTaxes}%</strong></span>
                            </div>
                        </div>
                        <div className="presale-section-buy-input">
                            <div className="presale-section-buy-inputbox">
                                <input id="nodes_quantity" type="range" min="0" max="200" onInput={this.handleChange}/>
                            </div>
                            <div className={this.state.selectedNode + " presale-section-buy-buttons"}>
                                <button onClick={this.handleModalOpen} className={this.state.selectedNode + " content-button status-button"}>Purchase</button>
                            </div>
                        </div>
                    </div>
                </>
            )
        

        return (
            <>
            <div className="main-container">
    
                <div className="content-wrapper">
                    {post}
                    {errorModal}
                    {buyModal}
                </div>
            </div>   
            </>
        )
    }
}
