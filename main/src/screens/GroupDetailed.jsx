import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import { Col, Row } from "react-bootstrap";
import GroupTasks from "../components/GroupTasks";
import { getAuth } from "firebase/auth";

function GroupDetailed() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchGroup = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const groupRef = doc(db, "groups", groupId);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
          const groupData = groupSnap.data();
          const memberList = groupData.members || [];

          // Check if user is a member
          const isMember = memberList.some((member) => member.id === user.uid);

          if (isMember) {
            setIsAuthorized(true);
            setGroup({ id: groupSnap.id, ...groupData });
          } else {
            setIsAuthorized(false);
          }
        } else {
          console.log("Group not found");
          navigate("/groups");
        }
      } catch (err) {
        console.error("Error fetching group:", err);
      }

      setIsLoading(false);
    };

    fetchGroup();
  }, [groupId, user, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view this group.</p>;
  if (!isAuthorized)
    return <p>Access denied. You are not a member of this group.</p>;
  if (!group) return <p>Group not found.</p>;

  return (
    <div>
      <h2>{group.groupName}</h2>
      <h4>Members:</h4>
      <ul>
        {group.members?.map((member, index) => (
          <li key={index}>
            {member.name} ({member.role})
          </li>
        ))}
      </ul>

      <Row>
        <Col>
          <AddTask groupId={group.id} groupName={group.groupName} />
        </Col>
      </Row>
      <GroupTasks groupId={group.id} />
    </div>
  );
}

export default GroupDetailed;
