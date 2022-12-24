//Properties
//header
//body
//confirmText         Confirm button text
//exec                code to execute

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalMessage(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    setShow(false);
    if(props.exec!=null){
      props.exec();
    };
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch modal demo
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            {props.confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
