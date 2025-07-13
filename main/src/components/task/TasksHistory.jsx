import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";

function TasksHistory() {
  const { groupId } = useParams();
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinishedTasks = async () => {
      try {
        const q = query(
          collection(db, "tasks"),
          where("groupId", "==", groupId),
          where("progress", "==", "Finished")
        );

        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFinishedTasks(tasks);
      } catch (err) {
        console.error("Error fetching finished tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedTasks();
  }, [groupId]);

  if (loading) return <Spinner animation="border" />;
  if (finishedTasks.length === 0) return <p>No finished tasks yet.</p>;

  return (
    <div>
      <h4 className="mt-4">Finished Tasks</h4>
      {finishedTasks.map((task) => (
        <Card key={task.id} className="mb-2 p-2">
          <strong>
            <Link to={`/tasks/${task.id}`}>{task.name}</Link>
          </strong>
          <div>Progress: {task.progress}</div>
          {task.finishedBy && <div>Finished by: {task.finishedBy}</div>}
        </Card>
      ))}
    </div>
  );
}

export default TasksHistory;
