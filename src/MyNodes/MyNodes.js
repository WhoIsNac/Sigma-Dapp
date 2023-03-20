
import React from 'react';

import ErrorModal from '../Components/Modals/ErrorModal';
import ClaimModal from '../Components/Modals/ClaimModal';
import NodeManager from './NodeManager';
//import LDNAddress from '../Contracts/contractsData/LoadedFinal-address.json';
import { ethers } from "ethers";


export default class MyNodes extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            tier1: {
                purchased: 0,
                daily: 0,
                active: 0,
                pending: 0,
                claim_tax: 0,
                last_claim: 0,
            },
            tier2: {
                purchased: 0,
                daily: 0,
                active: 0,
                pending: 0,
                claim_tax: 0,
                last_claim: 0,
            },
            tier3: {
                purchased: 0,
                daily: 0,
                active: 0,
                pending: 0,
                claim_tax: 0,
                last_claim: 0,
            },
            isloading: true,
            error: {},
            totalRewards: 0,
            allUserNode: null,
		}
        this.loadData = this.loadData.bind(this)
        this.createNodes = this.createNodes.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.claimRewards = this.claimRewards.bind(this)
        this.claimRewardsType = this.claimRewardsType.bind(this)
        this.handleClaimModalOpen = this.handleClaimModalOpen.bind(this)
	}

    componentDidMount() {
        this.loadData()
        this.timer = setInterval(() => {
            this.loadData()
        }, 20000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async createNodes(tier) {
        let price

        if (tier == 1) {
            tier = "Tier 1"
            price = "40.001"
        } else if (tier == 2) {
            tier = "Tier 2"
            price = "60.001"
        } else if (tier == 3) {
            tier = "Tier 3"
            price = "90.001"
        }
        try{
            let res = await this.props.ldn.createNodeWithTokens(tier, 1)
            let tx = await res.wait().then(this.props.closeModal())
            this.props.loadBalance()
            this.loadData()
            console.log("res createnode tx", tx);
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

    async claimRewards() {
        await this.props.ldn.cashoutAll()
        let res = await this.props.ldn.calculateAllClaimableRewards(this.props.wallet)
        let tx = await res.wait()
        this.props.loadBalance()
        this.loadData()
        this.setState(
            (pre) => ({
                totalRewards: ethers.utils.formatEther(res), 
            }), () => {
                console.log("Reward claimed")
            }
        );
    }

    async claimRewardsType(tier) {

        if (tier == "tier1") {
            tier = "0"
        } else if (tier == "tier2") {
            tier = "1"
        } else if (tier == "tier3") {
            tier = "2"
        }

        await this.props.ldn.cashoutAllType(tier)
        let res = await this.props.nodeHandler.calculateAllClaimableRewards(this.props.wallet)
        //TO FIX -- let tx = await res.wait()
        this.props.loadBalance()
        this.loadData()
        this.setState(
            (pre) => ({
                totalRewards: ethers.utils.formatEther(res), 
            }), () => {
                console.log("Reward claimed")
            }
        );
    }

    async loadData() {
        if (this.props.wallet) {
            //let calculateAllClaimableRewards = await this.props.ldn.calculateAllClaimableRewards(this.props.wallet)
            let getTotalCreatedNodes = await this.props.ldn.getTotalCreatedNodes()
            let getTier1 = await this.props.ldn.getNodeTypeOwnerNumber("Tier 1", this.props.wallet)
            let getTier2 = await this.props.ldn.getNodeTypeOwnerNumber("Tier 2", this.props.wallet)
            let getTier3 = await this.props.ldn.getNodeTypeOwnerNumber("Tier 3", this.props.wallet)
            let calculateAllClaimableRewardsType1 = await this.props.nodeHandler.calculateAllClaimableRewardsType(this.props.wallet, 0)
            let calculateAllClaimableRewardsType2 = await this.props.nodeHandler.calculateAllClaimableRewardsType(this.props.wallet, 1)
            let calculateAllClaimableRewardsType3 = await this.props.nodeHandler.calculateAllClaimableRewardsType(this.props.wallet, 2)
            let activeTier1 = await  this.props.ldn.getTotalCreatedNodesType(0)
            let activeTier2 = await  this.props.ldn.getTotalCreatedNodesType(1)
            let activeTier3 = await  this.props.ldn.getTotalCreatedNodesType(2)
            let allUserNode = await this.props.nodeHandler.getNodeEntityOwner(this.props.wallet)
            //console.log("getNodeEntityOWNERRRR######## 3", res2.toString())

            this.setState(
                (pre) => ({
                    totalCreated: getTotalCreatedNodes.toString(),
                    //rewards: ethers.utils.formatEther(calculateAllClaimableRewards),
                  //  address: LDNAddress.address,
                    tier1: {last_claim: 0, claim_tax: 20, purchased: getTier1.toString(), active: activeTier1.toString(), daily: Math.floor((getTier1.toString() * 0.4)*100)/100, pending: Math.floor(ethers.utils.formatEther(calculateAllClaimableRewardsType1)*1000)/1000},
                    tier2: {last_claim: 0, claim_tax: 17, purchased: getTier2.toString(), active: activeTier2.toString(), daily: Math.floor((getTier2.toString() * 0.63)*100)/100, pending: Math.floor(ethers.utils.formatEther(calculateAllClaimableRewardsType2)*1000)/1000},
                    tier3: {last_claim: 0, claim_tax: 15, purchased: getTier3.toString(), active: activeTier3.toString(), daily: Math.floor((getTier3.toString() * 1)*100)/100, pending: Math.floor(ethers.utils.formatEther(calculateAllClaimableRewardsType3)*1000)/1000},
                    isloading: false,
                    allUserNode: allUserNode
                }), () => {
                    console.log("loaddata", this.state);
                }
            );
        } else {
            console.log("No wallet");
        }
        // balanceToken()
        // getTotalCreatedNodesOf()
        // getNodeIndexOwner()
        // getNodeTypeOwner()
        // getNodeTypeAll1()
        // getNodeTypeAll2()
        // getNodeTypeAll3()
    }

    handleModalClose() {
        this.setState(
            (pre) => ({
                error: {},
                claimModalOpen: false,
            }),
            () => {
                //console.log("close modal")
            }
        );
        this.props.closeModal()
    }

    handleClaimModalOpen(event) {
        console.log(event)
        this.setState(
            (pre) => ({
                error: {},
                claimModalOpen: true,
                claimType: event
            }),
            () => {
                console.log(this.state)
                this.props.openModal()
            }
        );
    }


    render() {

        let post
        let rewards
        let errorModal
        let claimModal
        let load = 0

        if (this.state.error.msg) {
            errorModal = <ErrorModal {...this.state.error} handleModalClose={this.handleModalClose}/>
        }

        if (this.state.claimModalOpen) {
            claimModal = <ClaimModal {...this.state} handleModalClose={this.handleModalClose} claimRewards={this.claimRewards} claimRewardsType={this.claimRewardsType}></ClaimModal>
        } else {
            claimModal = (<></>)
        }

        if (this.state.isloading) {
            load = 1
        } else {
            load = 0
        }



        rewards = (
            <div className="content-section">
                <div className="nodemanager-container">
                    
                <NodeManager {...this.state} isloading={load} claimRewards={this.claimRewards} claimRewardsType={this.claimRewardsType} handleClaimModalOpen={this.handleClaimModalOpen}/>
              </div>
            </div>
        );

        return (
            <div className="main-container">
                    <div className="content-wrapper">
                        
                        {rewards}
                        {errorModal}
                        {claimModal}
                    </div>
                </div>
        );
    }
}
