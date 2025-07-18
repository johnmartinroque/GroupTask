import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../src_css/components/task/TaskCard.css";

function TaskCard(props) {
  const { id, name, description, datePosted, progress, groupName, groupId } =
    props;

  return (
    <div>
      <div class="card-body">
        <Link to={`/tasks/${id}`} class="card-title">
          {name}
        </Link>
        <p>{datePosted}</p>
        <p class="card-text">{description}</p>

        <p>Progress: {progress} </p>

        <Link to={`/tasks/${id}`} className="card-link">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
