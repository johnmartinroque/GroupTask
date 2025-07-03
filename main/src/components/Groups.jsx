import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Groups() {
  const [newGroupName, setNewGroupName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);

  const groupCollectionRef = collection(db, "groups");

  const createGroup = async () => {
    await addDoc(groupCollectionRef, { groupName: newGroupName });
    getGroupList();
  };

  const getGroupList = async () => {
    const data = await getDocs(groupCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setGroupList(filteredData);
  };

  const joinGroupHandler = () => {
    console.log(groupName);
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
