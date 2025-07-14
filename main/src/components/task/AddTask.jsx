import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";

function AddTask(props) {
  const { fetchNewTasks, groupId, groupName } = props;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [user, setUser] = useState(null);
  const taskListCollectionRef = collection(db, "tasks");

  const addTask = async () => {
    if (!newName.trim() || !newDescription.trim()) {
      setMessage("All fields are required.");
      setMessageType("danger");
      return;
    }

    try {
      setIsLoading(true);

      // Get current date and time in 12-hour format with AM/PM
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format

      const formattedDateTime = `${year}-${month}-${day} ${String(
        hours
      ).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

      await addDoc(taskListCollectionRef, {
        name: newName.trim(),
        description: newDescription.trim(),
        datePosted: formattedDateTime,
        progress: "No progress",
        createdBy: user.email,
        groupId: groupId,
        groupName: groupName,
      });

      setNewName("");
      setNewDescription("");
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
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          {isLoading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {!user ? (
            <Alert variant="warning">Please log in to add tasks.</Alert>
          ) : (
            <>
              <input
                type="text"
                placeholder="Task Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Task Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <Button onClick={addTask}>SUBMIT</Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AddTask;
