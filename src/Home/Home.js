import React from 'react'



//import './Home.scss'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({isLoading: false})
        }, 2000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    openwebsite() {
        window.location = "https://www.loadednodes.com/#"
    }

    openwhitepaper() {
        window.location = "https://docs.loadednodes.com/"
    }

    render() {

        let post

            post = (
                <>
                <div className="content-wrapper-header presale">
                            <div className="content-wrapper-home">
                                <h3 className="img-content-home">
                                    WELCOME TO SIGMA FINANCE
                                </h3>
                                <div className="content-text-home">
                                    <div>
                                        Sigma Finance aims to generate a whole ecosystem around DaaS and NaaS,
                                    </div>
                                    <div>
                                        with the objective of expanding to other protocols.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-section home-section">
                            
                            <div className="home-section-flex">
                                <div className="home-section-bloc-left">
                                    <div>
                                        <p>Logo</p>
                                    </div>
                                    <div className="home-section-text">
                                        <h2>
                                            THE NEW INNOVATIVE NODES PROTOCOL ON <strong>ARBI CHAIN</strong>
                                        </h2>
                                        <p>
                                            <strong>Sigma Finance</strong> is an innovative yield farming protocol built on <strong>Sigma Finance</strong>.
                                        </p>
                                        <p>
                                            Through the help of a multi-chain yield farming protocol, it will allow you to earn rewards by creating one or multiple nodes on our dApp.
                                        </p>
                                        <p>
                                            Then you simply <strong>claim your daily $SIG every day</strong>.
                                        </p>
                                        <div className='home-section-buttons'>
                                            <button onClick={() => this.openwebsite()} target="_blank" href="https://loadednodes.com" className='home-section-button'>WEBSITE</button>
                                            <button onClick={() => this.openwhitepaper()} className='home-section-button'>WHITEPAPER</button>
                                        </div>
                                    </div>
                                </div>
                          
                            </div>
                        </div>
                        </>
            );
        
        return (
        <>
            <div className="main-container">
    
                <div className="content-wrapper home-wrapper">
                    <div className="home-section-box">
                        {post}
                    </div>
                </div>
            </div>   
        </>
        )
    }
}
