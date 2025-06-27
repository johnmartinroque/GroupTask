import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function TaskDetailed() {
  const {} = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  return <div>TaskDetailed</div>;
}

export default TaskDetailed;
