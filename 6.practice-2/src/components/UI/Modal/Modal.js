import React from "react";
import ReactDOM from "react-dom";

import classes from './Modal.module.css';

const ModalEl = ({ children, closeModal }) => {
  return (
    <>
      <div className={classes.backdrop} onClick={closeModal} />
      <div className={classes.modal}>
        {children}
      </div>
    </>
  );
}

const Modal = ({ children, isOpen, closeModal }) => {
  const modalContainer = document.getElementById('overlays');

  return (
    <>
      {isOpen && ReactDOM.createPortal(<ModalEl closeModal={closeModal}>{children}</ModalEl>, modalContainer)}
    </>
  );
}

export default Modal;