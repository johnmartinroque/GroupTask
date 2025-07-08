import { Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import RemoveMember from "../modals/RemoveMember";

function GroupMembers({ members, isAdmin, handleRemoveMember }) {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div>
      <h4>Members:</h4>
      <ul>
        {members?.map((member, index) => (
          <li key={index}>
            {member.name} ({member.role})
            {isAdmin && member.id !== user?.uid && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveMember(member)}
                className="ms-2"
              >
                Remove
              </Button>
            )}
            <RemoveMember name={member.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupMembers;
