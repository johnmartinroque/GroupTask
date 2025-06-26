import { collection, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import TaskCard from "./TaskCard";

function Tasks() {
  const [taskList, setTaskList] = useState([]);

  const taskListCollectionRef = collection(db, "tasks");

  const getTaskList = async () => {
    try {
      await getDoc(taskListCollectionRef);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {};

  const updateTask = async () => {};
  return (
    <div>
      <TaskCard />
    </div>
  );
}

export default Tasks;
