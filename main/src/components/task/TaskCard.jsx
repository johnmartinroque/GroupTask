import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function TaskCard(props) {
  const { id, name, description, datePosted, progress, groupName } = props;

  return (
    <Card
      style={{
        margin: "20px auto",
        maxWidth: "500px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
      }}
    >
      <Card.Body>
        <h5 style={{ marginBottom: "10px", fontWeight: "bold" }}>
          <Link
            to={`/tasks/${id}`}
            style={{
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            {name}
          </Link>
        </h5>

        {groupName && (
          <p
            style={{ marginBottom: "5px", fontStyle: "italic", color: "#666" }}
          >
            Group: {groupName}
          </p>
        )}

        <p style={{ fontSize: "0.875rem", color: "#999", marginBottom: "8px" }}>
          Posted on: {datePosted}
        </p>

        <p style={{ marginBottom: "10px" }}>{description}</p>

        <p
          style={{ fontWeight: "500", color: "#28a745", marginBottom: "12px" }}
        >
          Progress: {progress}
        </p>

        <Link
          to={`/tasks/${id}`}
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: "6px",
            backgroundColor: "#007bff",
            color: "#fff",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
