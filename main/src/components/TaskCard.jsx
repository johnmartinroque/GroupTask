import React from "react";
import { Link } from "react-router-dom";

function TaskCard(props) {
  const { id, name, description, datePosted } = props;
  const formattedDate =
    datePosted && typeof datePosted.toDate === "function"
      ? datePosted.toDate().toLocaleDateString("en-US") // Format as a readable date string
      : "N/A"; // Or any placeholder for when datePosted is not available or not a Timestamp
  return (
    <div>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p>{formattedDate}</p>
          <p class="card-text">{description}</p>

          <Link to={`/tasks/${id}`} className="card-link">
            View Details
          </Link>
          <a href="#" class="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
