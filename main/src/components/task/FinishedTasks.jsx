import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Card, Container, Spinner } from "react-bootstrap";

function FinishedTasks() {
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
      <h4 className="mt-4 text-center">Finished Tasks</h4>
      <div className="container">
        <div className="row">
          {finishedTasks.map((task) => (
            <div
              key={task.id}
              className="col-md-4 mb-4 d-flex justify-content-center"
            >
              <Card
                className="p-3"
                style={{ width: "100%", maxWidth: "22rem" }}
              >
                <strong>
                  <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                </strong>
                <div>Progress: {task.progress}</div>
                {task.finishedBy && <div>Finished by: {task.finishedBy}</div>}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FinishedTasks;
