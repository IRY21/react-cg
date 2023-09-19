import React from "react";
import ReactDOM from "react-dom";

import classes from "./ErrorModal.module.css";

import Card from "../Card/Card";
import Button from "../Button/Button";

const Backdrop = ({ onCloseModal }) => {
  return <div className={classes.backdrop} onClick={onCloseModal} />;
};

const ModalOverlay = ({ title, message, onCloseModal }) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        {message}
      </div>
      <footer className={classes.actions}>
        <Button onClick={onCloseModal}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = ({ title, message, onCloseModal }) => {

  return (
    <>
      {
        ReactDOM.createPortal(<Backdrop
          onClose={onCloseModal} />, document.getElementById('backdrop-root'))
      }
      {
        ReactDOM.createPortal(<ModalOverlay 
          title={title}
          message={message}
          onCloseModal={onCloseModal} />, document.getElementById('overlay-root'))
      }
    </>
  );
}

export default ErrorModal;