import React from "react";
import { Button, Modal } from "react-bootstrap";

function LeaveGroup({ show, onClose, onConfirm, title, body }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Are you sure?"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body || "Do you want to leave this group?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Leave Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LeaveGroup;
