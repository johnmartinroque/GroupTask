import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card, Container, Button } from "react-bootstrap";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function TaskDetailed() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const fetchTask = async () => {
    try {
      const taskDoc = await getDoc(doc(db, "tasks", taskId));
      if (taskDoc.exists()) {
        const data = { id: taskDoc.id, ...taskDoc.data() };
        setTask(data);
        setProgress(data.progress || ""); // pre-fill the select input
      } else {
        console.log("No such task!");
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <Container>
        <h2>Task not found.</h2>
      </Container>
    );
  }
  const updateTask = async () => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        progress: progress,
        finishedBy:
          progress === "Finished" && currentUser ? currentUser.email : "",
      });
      fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  const formattedDate =
    task.datePosted && typeof task.datePosted.toDate === "function"
      ? task.datePosted.toDate().toLocaleDateString("en-US")
      : "N/A";

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>{task.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Posted on: {formattedDate}
          </Card.Subtitle>
          <Card.Text>{task.description}</Card.Text>
          <Card.Text>{task.progress}</Card.Text>
          <select
            className="form-select"
            value={progress}
            onChange={(e) => {
              setProgress(e.target.value);
            }}
          >
            <option value="">Open this select menu</option>
            <option value="No progress">No progress</option>
            <option value="In progress">In progress</option>
            <option value="Finished">Finished</option>
          </select>
          <Button variant="success" className="me-2" onClick={updateTask}>
            Update Status
          </Button>
        </Card.Body>
      </Card>
      <Link to={`/group/${task.groupId}`}>
        <Button variant="primary">Back</Button>
      </Link>
    </Container>
  );
}

export default TaskDetailed;
