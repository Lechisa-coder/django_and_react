import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewStudentForm from "./NewStudentForm";

const NewStudentModal = ({ create, resetState, student }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const title = create ? "Creating New Student" : "Editing Student";

  const button = create ? (
    <Button
      color="primary"
      className="float-right"
      onClick={toggle}
      style={{ minWidth: "200px" }}
    >
      Create New
    </Button>
  ) : (
    <Button onClick={toggle}>Edit</Button>
  );

  return (
    <>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <NewStudentForm
            resetState={resetState}
            toggle={toggle}
            student={student}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewStudentModal;
