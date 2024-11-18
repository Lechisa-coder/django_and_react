import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const NewStudentForm = ({ student, resetState, toggle }) => {
  const [formData, setFormData] = useState({
    pk: 0,
    name: "",
    email: "",
    document: "",
    phone: ""
  });

  useEffect(() => {
    if (student) {
      const { pk, name, email, document, phone } = student;
      setFormData({ pk, name, email, document, phone });
    }
  }, [student]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      resetState();
      toggle();
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const editStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}${formData.pk}`, formData);
      resetState();
      toggle();
    } catch (error) {
      console.error("Error editing student:", error);
    }
  };

  const defaultIfEmpty = (value) => (value === "" ? "" : value);

  return (
    <Form onSubmit={student ? editStudent : createStudent}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={onChange}
          value={defaultIfEmpty(formData.name)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          type="email"
          name="email"
          onChange={onChange}
          value={defaultIfEmpty(formData.email)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="document">Document:</Label>
        <Input
          type="text"
          name="document"
          onChange={onChange}
          value={defaultIfEmpty(formData.document)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone:</Label>
        <Input
          type="text"
          name="phone"
          onChange={onChange}
          value={defaultIfEmpty(formData.phone)}
        />
      </FormGroup>
      <Button>Send</Button>
    </Form>
  );
};

export default NewStudentForm;
