import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { Card, Spinner, Row, Col } from "react-bootstrap";

function GroupTasks() {
  const { groupId } = useParams(); // assumes groupId is in URL
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("groupId", "==", groupId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
      setIsLoading(false);
    });

    // Clean up real-time listener on unmount
    return () => unsubscribe();
  }, [groupId]);

  if (isLoading) return <Spinner animation="border" variant="primary" />;

  return (
    <div>
      <h3>Group Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found for this group.</p>
      ) : (
        <Row>
          {tasks.map((task) => (
            <Col key={task.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{task.name}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {task.description}
                    <br />
                    <strong>Date Posted:</strong> {task.datePosted}
                    <br />
                    <strong>Progress:</strong> {task.progress}
                    <br />
                    <strong>Created By:</strong> {task.createdBy}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default GroupTasks;
