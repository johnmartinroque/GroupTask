import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Groups() {
  const [groupName, setGroupName] = useState("");

  const joinGroupHandler = () => {
    console.log(groupName);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>hello</Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={joinGroupHandler}>Join</Button>
            <input
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
