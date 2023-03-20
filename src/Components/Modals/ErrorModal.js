import React from "react";


//import './Modal.scss'

export default class ErrorModal extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
		}
	}

    render() {

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
                    {this.props.block ? null : close}
                    <div className="modal-content_error">
                        <h5 className="modal-content_error_top_title">
                        ERROR
                        </h5>
                        <h5 className="modal-content_title">
                            {this.props.msg}
                        </h5>
                        <h5 className="modal-content_title">
                            {this.props.msg2}
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}