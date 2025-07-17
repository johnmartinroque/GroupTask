import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import TaskCard from "./TaskCard";
import { getDocs, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "../../src_css/components/task/Tasks.css";

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

      const groupsSnapshot = await getDocs(collection(db, "groups"));

      // ✅ Only include groups where the user's role is not "pending"
      const userGroups = groupsSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const userMember = (data.members || []).find((m) => m.id === uid);
          return userMember && userMember.role !== "pending"
            ? {
                id: doc.id,
                name: data.groupName,
              }
            : null;
        })
        .filter(Boolean); // remove nulls

      const tasksRef = collection(db, "tasks");
      const groupedTasks = {};

      for (const group of userGroups) {
        const q = query(tasksRef, where("groupId", "==", group.id));
        const taskSnap = await getDocs(q);

        groupedTasks[group.id] = {
          groupName: group.name,
          tasks: taskSnap.docs
            .map((doc) => {
              const data = doc.data();
              return {
                ...data,
                id: doc.id,
                datePosted: data.datePosted?.toDate
                  ? data.datePosted.toDate()
                  : null,
              };
            })
            .filter((task) => task.progress !== "Finished"),
        };
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
          {Object.entries(tasksByGroup).map(([groupId, groupData]) => (
            <div key={groupId}>
              <h4>
                <a
                  href={`/group/${groupId}`}
                >
                  {groupData.groupName}
                </a>
              </h4>
              <Row className="g-4">
                {Array.isArray(groupData.tasks) &&
                groupData.tasks.length > 0 ? (
                  groupData.tasks.map((task) => (
                    <Col key={task.id} xs={12} sm={6} md={4} lg={3}>
                      <div className="task-card-wrapper">
                      <TaskCard
                        id={task.id}
                        name={task.name}
                        description={task.description}
                        datePosted={task.datePosted}
                        progress={task.progress}
                        groupName={groupData.groupName}
                        groupId={groupId}
                      />
                    </div>
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
