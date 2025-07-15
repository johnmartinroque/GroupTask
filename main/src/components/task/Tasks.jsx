import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import TaskCard from "./TaskCard";
import { getDocs, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";

function Tasks() {
  const [tasksByGroup, setTasksByGroup] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchTasks(user.uid);
      } else {
        setUserId(null);
        setTasksByGroup({});
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = async (uid) => {
    try {
      setIsLoading(true);

      // Step 1: Get all groups user is a member of
      const groupsSnapshot = await getDocs(collection(db, "groups"));
      const userGroups = groupsSnapshot.docs
        .filter((doc) => (doc.data().members || []).some((m) => m.id === uid))
        .map((doc) => ({
          id: doc.id,
          name: doc.data().groupName,
        }));

      // Step 2: For each group, get its tasks (excluding finished)
      const tasksRef = collection(db, "tasks");
      const groupedTasks = {};

      for (const group of userGroups) {
        const q = query(tasksRef, where("groupId", "==", group.id));
        const taskSnap = await getDocs(q);

        groupedTasks[group.name] = taskSnap.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((task) => task.progress !== "Finished"); // ❌ Exclude "Finished"
      }

      setTasksByGroup(groupedTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTaskAdded = () => {
    if (userId) {
      fetchTasks(userId);
    }
  };

  return (
    <Container>
      <h1>My Group Tasks</h1>

      {isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              <Spinner />
            </span>
          </div>
        </div>
      ) : userId ? (
        <>
          {Object.entries(tasksByGroup).map(([groupName, tasks]) => (
            <div key={groupName}>
              <h4 className="mt-4 mb-3">{groupName}</h4>
              <Row className="g-4">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <Col key={task.id} xs={12} sm={6} md={4} lg={3}>
                      <TaskCard
                        id={task.id}
                        name={task.name}
                        description={task.description}
                        datePosted={task.datePosted}
                        progress={task.progress}
                      />
                    </Col>
                  ))
                ) : (
                  <Col>
                    <p>No tasks in this group yet.</p>
                  </Col>
                )}
              </Row>
            </div>
          ))}
        </>
      ) : (
        <Alert variant="warning">Please log in to view your tasks.</Alert>
      )}
    </Container>
  );
}

export default Tasks;
