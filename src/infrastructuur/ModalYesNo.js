//Properties
//header
//body
//cancelText          Cancel button text
//confirmText         Confirm button text
//exec                code to exe


import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalYesNo(props) {
  // if(props["exec"]==null)props["exec"]=()=>{};
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    setShow(false);
    if(props["exec"]!=null){
      props.exec();
    };
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch modal demo
      </Button> */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {props.cancelText}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {props.confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
