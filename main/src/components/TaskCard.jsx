import { collection, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

function TaskCard() {
  const [taskList, setTaskList] = useState([]);

  const taskListCollectionRef = collection(db, "tasks");

  const getTaskList = async () => {
    try {
      await getDoc(taskListCollectionRef);
    } catch (err) {
      console.error(err);
    }
  };
  return <div>TaskCard</div>;
}

export default TaskCard;
