import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";

function AddTask(props) {
  const { fetchNewTasks, groupId, groupName } = props;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [user, setUser] = useState(null);
  const [newDeadline, setNewDeadline] = useState("");

  const taskListCollectionRef = collection(db, "tasks");

  const addTask = async () => {
    if (!newName.trim() || !newDescription.trim()) {
      setMessage("All fields are required.");
      setMessageType("danger");
      return;
    }

    try {
      setIsLoading(true);

      const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${year}-${month}-${day} ${String(hours).padStart(
          2,
          "0"
        )}:${minutes}:${seconds} ${ampm}`;
      };

      const now = new Date();
      const formattedDateTime = formatDateTime(now);

      let formattedDeadline = null;
      if (newDeadline) {
        const deadlineDate = new Date(newDeadline);
        formattedDeadline = formatDateTime(deadlineDate);
      }

      await addDoc(taskListCollectionRef, {
        name: newName.trim(),
        description: newDescription.trim(),
        datePosted: formattedDateTime,
        deadline: formattedDeadline,
        progress: "No progress",
        createdBy: user.email,
        groupId: groupId,
        groupName: groupName,
      });

      setNewName("");
      setNewDescription("");
      setNewDeadline("");
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
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "20vh", minWidth: "5vh" }}
    >
      <Container>
        {isLoading && (
          <div
            className="p-5 rounded d-flex justify-content-center mb-3"
            role="status"
          >
            <span className="visually-hidden">
              <Spinner />
            </span>
          </div>
        )}
        {!user ? (
          <Alert variant="warning">Please log in to add tasks.</Alert>
        ) : (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Task Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Task Description"
              className="form-control mb-2"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={4}
              cols={80}
            />
            <label>Optional Deadline</label>
            <input
              type="datetime-local"
              className="form-control mb-3"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
            />
            <Button onClick={addTask}>SUBMIT</Button>
          </>
        )}
      </Container>
    </div>
  );
}

export default AddTask;
