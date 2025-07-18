import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams, Link } from "react-router-dom";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { db } from "../firebase";

function Search() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const groupCollectionRef = collection(db, "groups");
        const data = await getDocs(groupCollectionRef);
        const allGroups = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setGroups(allGroups);

        const filtered = allGroups.filter((group) =>
          group.groupName?.toLowerCase().includes(searchQuery)
        );
        setFilteredGroups(filtered);
      } catch (err) {
        console.error("Error fetching groups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [searchQuery]);

  return (
    <Container className="mt-4">
      <h2>Search Results for "{searchQuery}"</h2>
      <Row className="mt-3">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading groups...</p>
          </div>
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <Col key={group.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <h5>{group.groupName}</h5>
                  <Link to={`/group/${group.id}`}>View Group</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No groups found names "{searchQuery}"</p>
        )}
      </Row>
    </Container>
  );
}

export default Search;
