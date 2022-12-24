import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalLarge(props) {
  props={...props}
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

if(!props?.closeButton)props.closeButton=true;

  const form = (
    <>
      {/* <Button variant="primary" onClick={handleShow}> Launch modal demo </Button> */}
      <Modal
        id="ModalLargeId"
        show={show}
        onHide={handleClose}
        backdrop="static"
        animation={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton={props?.closeButton}>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.body}
          {props.render && <>{props.render()}</>}
        </Modal.Body>
      </Modal>
    </>
  );

  return form;
}

export const deleteModalLarge = () => {
  document.querySelectorAll(".modal").forEach((el) => {
    el.style.visibility = "hidden";
    el.classList.remove("modal-backdrop");
  });
  document.getElementById("ModalLargeId").classList.remove("show", "d-block");
  document
    .querySelectorAll(".modal-backdrop")
    .forEach((el) => el.classList.remove("modal-backdrop"));
  const formBody = document.getElementById("formBody");
  if (formBody) {
    formBody.innerHTML = "";
    formBody.innerText = "";
  }
  const modalLarge = document.getElementById("ModalLarge");
  if (modalLarge) {
    modalLarge.innerHTML = "";
    modalLarge.innerText = "";
  }
};
