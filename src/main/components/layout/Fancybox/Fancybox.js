import React, { Component } from 'react';
import { Button } from '../../forms';
import ReactDOM from 'react-dom';
import ModalVideo from 'react-modal-video';
// import '../../../../../node_modules/react-modal-video/css/modal-video.min.css';
 
class LightboxExample extends Component {
    constructor () {
        super()
        this.state = {
          isOpen: false
        }
        this.openModal = this.openModal.bind(this)
      }
      openModal () {
        this.setState({isOpen: true})
      }

      render() {
        const {
            photoIndex,
            isOpen,
        } = this.state;
        const icon = {
            type: 'play',
        }
        return (
            <span>
                <Button action="click" icon={icon}  handleClick={() => this.setState({ isOpen: true })} className="video-btn btn--outline-white" text="Play video" />
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='I6Z_SrlchK0' onClose={() => this.setState({isOpen: false})} />
            </span>
        );
    }
}

export default LightboxExample;
