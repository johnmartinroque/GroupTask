import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import TaskCard from "./TaskCard";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import AddTask from "./AddTask";

function Tasks() {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const taskListCollectionRef = collection(db, "tasks");

  const getTaskList = async () => {
    try {
      setIsLoading(true);
      const data = await getDocs(taskListCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTaskList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);
  return (
    <>
      <Container>
        <h1>My Tasks</h1>
        {isLoading ? ( // Conditionally render the spinner or the tasks
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {taskList.map((task) => (
                <Col key={task.id} xs={12} sm={6} md={4} lg={3}>
                  <TaskCard
                    id={task.id}
                    name={task.name}
                    description={task.description}
                    datePosted={task.datePosted}
                    progress={task.progress}
                  />
                </Col>
              ))}
            </Row>
            <Row className="my-4">
              {" "}
              {/* Added margin for spacing */}
              <Col>
                <AddTask fetchNewTasks={getTaskList} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default Tasks;
