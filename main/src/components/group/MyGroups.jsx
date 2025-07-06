import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function MyGroups() {
  const [myGroups, setMyGroups] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const fetchMyGroups = async () => {
      if (!userId) return;

      const groupCollectionRef = collection(db, "groups");
      const groupSnapshot = await getDocs(groupCollectionRef);

      const filteredGroups = groupSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((group) =>
          group.members?.some((member) => member.id === userId)
        );

      setMyGroups(filteredGroups);
    };

    fetchMyGroups();
  }, [userId]);

  return (
    <Container>
      <h2 className="mt-4">My Groups</h2>
      <Row>
        {myGroups.length > 0 ? (
          myGroups.map((group) => (
            <Col md={4} key={group.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{group.groupName}</Card.Title>
                  <Link to={`/group/${group.id}`}>View Group</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>You are not a member of any groups.</p>
        )}
      </Row>
    </Container>
  );
}

export default MyGroups;
