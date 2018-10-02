import React, { Component } from 'react';
import { Button } from '../../forms';

import Modal from 'react-responsive-modal'

class PuraModal extends Component {
    constructor(props) {
        
        super(props)

        this.state = {
            modalIsOpen: true,
        }

        this.openModal = this.openModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }


    onCloseModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {

        return (
            <Modal
                open={this.state.modalIsOpen}
                onClose={this.onCloseModal}
                closeIconSize={20}
                classNames={{ overlay: 'css-overlay-transparent', modal: 'css-modal-top' }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',

                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        margin: '-24px 0px 0px 0px',
                    }}>

                        <h4 style={{
                            color: '#000',
                            fontWeight: 700,
                        }}> &nbsp; Summer Sale!!! Use code <span style={{ color: '#18cea0', }}>25FORYOU</span> for 25% off today! </h4>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',

                    }}>

                    </div>
                </div>
            </Modal>
        );
    }
}

export default PuraModal;
