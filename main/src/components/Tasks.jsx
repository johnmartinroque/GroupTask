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
import { Col, Container, Row } from "react-bootstrap";

function Tasks() {
  const [taskList, setTaskList] = useState([]);

  const taskListCollectionRef = collection(db, "tasks");

  const getTaskList = async () => {
    try {
      const data = await getDocs(taskListCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTaskList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {};

  const updateTask = async () => {};

  useEffect(() => {
    getTaskList();
  }, []);
  return (
    <Container>
      {" "}
      {/* Wrap content in a Container for proper Bootstrap layout */}
      <h1>My Tasks</h1>
      {/* Place the Row outside the map function to create a single row for all cards */}
      <Row className="g-4">
        {" "}
        {/* Use g-4 for gutter spacing between columns */}
        {taskList.map((task) => (
          <Col key={task.id} xs={12} sm={6} md={4} lg={3}>
            {/*
              Breakdown of Col sizing:
              - xs={12}: On extra-small screens, take up 12 columns (full width)
              - sm={6}: On small screens, take up 6 columns (2 cards per row, since 12/6=2)
              - md={4}: On medium screens, take up 4 columns (3 cards per row, since 12/4=3)
              - lg={3}: On large screens and up, take up 3 columns (4 cards per row, since 12/3=4)

              The 'lg={3}' is the one that achieves "4 TaskCard per row" on larger screens.
              Bootstrap's grid is 12 columns wide. To get 4 items per row, each item needs to
              take up 12 / 4 = 3 columns.
            */}
            <TaskCard
              id={task.id}
              name={task.name}
              description={task.description}
              datePosted={task.datePosted}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Tasks;
