import { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalBox, Overlay } from './modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal('', '');
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.toggleModal('', '');
    }
  };

  render() {
    let { largeImageURL, tags } = this.props.urlImage;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalBox>
          <img src={largeImageURL} alt={tags} />
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
