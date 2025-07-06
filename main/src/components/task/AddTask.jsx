import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";

function AddTask(props) {
  const { fetchNewTasks, groupId, groupName } = props;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [progress, setProgress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [user, setUser] = useState(null);
  const taskListCollectionRef = collection(db, "tasks");

  const addTask = async () => {
    if (!newName.trim() || !newDescription.trim() || !newDate) {
      setMessage("All fields are required.");
      setMessageType("danger");
      return;
    }

    try {
      setIsLoading(true);
      const currentDate = new Date().toISOString().slice(0, 10);

      await addDoc(taskListCollectionRef, {
        name: newName.trim(),
        description: newDescription.trim(),
        datePosted: currentDate,
        progress: "No progress",
        createdBy: user.email,
        groupId: groupId,
        groupName: groupName,
      });

      setNewName("");
      setNewDescription("");
      setNewDate("");
      setMessage("Task added successfully!");
      setMessageType("success");

      if (fetchNewTasks) {
        fetchNewTasks();
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to add task. Please try again.");
      setMessageType("danger");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  return (
    <div>
      <Row>
        <Col>
          {isLoading ? (
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <></>
          )}
          {!user ? (
            <Alert variant="warning">Please log in to add tasks.</Alert>
          ) : (
            <>
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
              <Button onClick={addTask}>SUBMIT</Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AddTask;
