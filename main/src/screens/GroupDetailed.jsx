import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import AddTask from "../components/task/AddTask";
import { Col, Row, Button } from "react-bootstrap";
import GroupTasks from "../components/task/GroupTasks";
import { getAuth } from "firebase/auth";

function GroupDetailed() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const leaveGroup = async () => {
    if (!group || !user) return;

    const updatedMembers = group.members.filter((m) => m.id !== user.uid);

    try {
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: updatedMembers,
      });

      navigate("/");
    } catch (err) {
      console.error("Failed to leave group:", err);
    }
  };

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

          const currentUser = memberList.find((m) => m.id === user.uid);
          const isMember = !!currentUser;
          const isUserAdmin = currentUser?.role === "admin";

          setIsAuthorized(isMember);
          setIsAdmin(isUserAdmin);
          setGroup({ id: groupSnap.id, ...groupData });
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

  const handleRemoveMember = async (memberId) => {
    if (!group) return;

    const updatedMembers = group.members.filter((m) => m.id !== memberId);

    try {
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: updatedMembers,
      });

      // Update UI
      setGroup((prev) => ({
        ...prev,
        members: updatedMembers,
      }));
    } catch (err) {
      console.error("Failed to remove member:", err);
    }
  };

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
            {isAdmin && member.id !== user.uid && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveMember(member.id)}
                className="ms-2"
              >
                Remove
              </Button>
            )}
          </li>
        ))}
      </ul>

      <Row>
        <Col>
          <AddTask groupId={group.id} groupName={group.groupName} />
        </Col>
      </Row>
      <GroupTasks groupId={group.id} />
      {isAuthorized && (
        <Button
          variant="warning"
          className="mb-3"
          onClick={leaveGroup}
          disabled={
            isAdmin &&
            group.members.filter((m) => m.role === "admin").length === 1
          }
        >
          Leave Group
        </Button>
      )}
    </div>
  );
}

export default GroupDetailed;
