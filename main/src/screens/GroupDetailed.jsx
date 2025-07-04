import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import { Col, Row } from "react-bootstrap";
import GroupTasks from "../components/GroupTasks";

function GroupDetailed() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      const groupRef = doc(db, "groups", groupId);
      const groupSnap = await getDoc(groupRef);

      if (groupSnap.exists()) {
        const groupData = groupSnap.data();
        setGroup({ id: groupSnap.id, ...groupData });

        // Fetch member names from users collection
        if (groupData.members && Array.isArray(groupData.members)) {
          const memberNamePromises = groupData.members.map(async (userId) => {
            try {
              const userRef = doc(db, "users", userId);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                const userData = userSnap.data();
                return userData.name || userId;
              }
              return userId; // fallback
            } catch (err) {
              console.error("Error fetching user:", err);
              return userId;
            }
          });

          const names = await Promise.all(memberNamePromises);
          setMemberNames(names);
        }
      } else {
        console.log("Group not found");
      }
    };

    fetchGroup();
  }, [groupId]);

  if (!group) return <p>Loading...</p>;

  return (
    <div>
      <h2>{group.groupName}</h2>
      <h4>Members:</h4>
      <ul>
        {group.members?.map((member, index) => (
          <li key={index}>{member.name}</li> // ✅ access the name property
        ))}
      </ul>
      <Row>
        <Col>
          <AddTask groupId={group.id} groupName={group.groupName} />
        </Col>
      </Row>
      <GroupTasks />
    </div>
  );
}

export default GroupDetailed;
