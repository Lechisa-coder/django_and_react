import React, { useState } from "react";
import {
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import NewStudentModal from "./NewStudentModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

const StudentList = ({ students, resetState }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil((students?.length || 0) / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents =
    students?.slice(startIndex, startIndex + studentsPerPage) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-responsive mt-4">
      <Table hover bordered className="table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Document</th>
            <th>Phone</th>
            <th>Registration Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!students || students.length <= 0 ? (
            <tr>
              <td colSpan="7" align="center" className="text-muted">
                <b>Oops, no students here yet!</b>
              </td>
            </tr>
          ) : (
            currentStudents.map((student, index) => (
              <tr key={student.pk}>
                <td>{startIndex + index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.document}</td>
                <td>{student.phone}</td>
                <td>{student.registrationDate}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center">
                    <NewStudentModal
                      create={false}
                      student={student}
                      resetState={resetState}
                    />
                    <ConfirmRemovalModal
                      pk={student.pk}
                      resetState={resetState}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="d-flex justify-content-center mt-3">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem active={currentPage === i + 1} key={i}>
              <PaginationLink onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink
              next
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
          </PaginationItem>
        </Pagination>
      )}
    </div>
  );
};

export default StudentList;
