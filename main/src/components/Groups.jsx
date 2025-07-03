import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { db } from "../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Groups() {
  const [newGroupName, setNewGroupName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);

  const groupCollectionRef = collection(db, "groups");
  const navigate = useNavigate();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const createGroup = async () => {
    await addDoc(groupCollectionRef, { groupName: newGroupName });
    getGroupList();
    setNewGroupName("");
  };

  const getGroupList = async () => {
    const data = await getDocs(groupCollectionRef);
    const filteredData = data.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((doc) => typeof doc.groupName === "string"); // 👈 filter out bad docs
    setGroupList(filteredData);
  };

  const joinGroupHandler = async () => {
    const trimmedInput = groupName.trim().toLowerCase();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("You must be logged in to join a group.");
      return;
    }

    const group = groupList.find((g) => {
      return g.groupName?.toLowerCase() === trimmedInput;
    });

    if (!group) {
      alert("Group not found!");
      return;
    }

    const groupRef = doc(db, "groups", group.id);

    try {
      await updateDoc(groupRef, {
        members: arrayUnion(userId),
      });
      console.log("Joined group and added to members!");
      navigate(`/groups/${group.id}`);
    } catch (err) {
      console.error("Error joining group:", err);
    }
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>Groups</Col>
          {groupList.map((group) => (
            <Col key={group.id}>{group.groupName}</Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Button onClick={createGroup}>Create Group</Button>
            <input
              placeholder="Input new group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button onClick={joinGroupHandler}>Join</Button>
            <input
              placeholder="input group name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Groups;
