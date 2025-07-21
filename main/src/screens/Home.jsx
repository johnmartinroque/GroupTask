import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Tasks from "../components/task/Tasks";
import Groups from "../components/group/Groups";
import MyGroups from "../components/group/MyGroups";
import Graph from "../components/group/graph/Graph";
import "../src_css/screens/Home.css";

function Home() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  return (
    <div id="home">
      <div className="left-side">
        <div className="top-left">
          <Tasks
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
          />
        </div>
        <div className="bottom-left">
          <MyGroups />
          <Groups />
        </div>
      </div>

      <div className="right-side">
        <h1 className="mb-3">Progress Graph</h1>
        {selectedGroupId ? (
          <Link
            to={`/group/${selectedGroupId}`}
            className="text-decoration-none text-dark"
          >
            <div className="graph-container">
              <Graph selectedGroupId={selectedGroupId} />
            </div>
          </Link>
        ) : (
          <>
            <h1 className="mb-3">Progress Graph</h1>
            <p>Please select a group to view the graph.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
