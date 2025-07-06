import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function TaskCard(props) {
  const { id, name, description, datePosted, progress } = props;
  const formattedDate =
    datePosted && typeof datePosted.toDate === "function"
      ? datePosted.toDate().toLocaleDateString("en-US") // Format as a readable date string
      : "N/A"; // Or any placeholder for when datePosted is not available or not a Timestamp
  return (
    <div>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <Link to={`/tasks/${id}`} class="card-title">
            {name}
          </Link>
          <p>{formattedDate}</p>
          <p class="card-text">{description}</p>
          <p>Progress: {progress} </p>

          <Link to={`/tasks/${id}`} className="card-link">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
