import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import StudentList from "./StudentList";
import NewStudentModal from "./NewStudentModal";

import axios from "axios";
import { API_URL } from "../constants";

const Home = () => {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const resetState = () => {
    getStudents();
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <StudentList students={students} resetState={resetState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewStudentModal create={true} resetState={resetState} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
