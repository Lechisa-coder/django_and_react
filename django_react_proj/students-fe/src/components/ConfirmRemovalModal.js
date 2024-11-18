import React, { useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const ConfirmRemovalModal = ({ pk, resetState }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const deleteStudent = async (pk) => {
    try {
      await axios.delete(`${API_URL}${pk}`);
      resetState();
      toggle();
    } catch (error) {
      console.error("There was an error deleting the student!", error);
    }
  };

  return (
    <>
      <Button color="danger" onClick={toggle}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really want to delete the student?
        </ModalHeader>
        <ModalFooter>
          <Button type="button" onClick={toggle}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteStudent(pk)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmRemovalModal;
