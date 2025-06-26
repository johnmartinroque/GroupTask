import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, Col, Row } from "react-bootstrap";

function AddTask(props) {
  const { fetchNewTasks } = props;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const taskListCollectionRef = collection(db, "tasks");
  const addTask = async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    await addDoc(taskListCollectionRef, {
      name: newName,
      description: newDescription,
      datePosted: currentDate,
    });

    setNewName("");
    setNewDescription("");
    setNewDate("");
    if (fetchNewTasks) {
      fetchNewTasks();
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Row>
        <Col>
          <Button onClick={addTask}>SUBMIT</Button>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          ></input>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></input>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          ></input>
        </Col>
      </Row>
    </div>
  );
}

export default AddTask;
