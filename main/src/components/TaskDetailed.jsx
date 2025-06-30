import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card, Container, Button } from "react-bootstrap";

function TaskDetailed() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDoc = await getDoc(doc(db, "tasks", taskId));
        if (taskDoc.exists()) {
          setTask({ id: taskDoc.id, ...taskDoc.data() });
        } else {
          console.log("No such task!");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setIsLoading(false);
      }
    };

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
      await updateDoc(taskRef, { status: status });
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
          <select
            className="form-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              updateTask(e.target.value);
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
          <Link to="/">
            <Button variant="primary">Back to Tasks</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TaskDetailed;
