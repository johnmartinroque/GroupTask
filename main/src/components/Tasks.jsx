import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import TaskCard from "./TaskCard";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Tasks() {
  const [taskList, setTaskList] = useState([]);

  const taskListCollectionRef = collection(db, "tasks");

  const getTaskList = async () => {
    try {
      const data = await getDocs(taskListCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTaskList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {};

  const updateTask = async () => {};

  useEffect(() => {
    getTaskList();
  }, []);
  return (
    <div>
      <h1>Hello</h1>

      {taskList.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
        />
      ))}
    </div>
  );
}

export default Tasks;
