import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Tasks from "../components/task/Tasks";
import Groups from "../components/group/Groups";
import MyGroups from "../components/group/MyGroups";
import "../src_css/screens/Home.css";
import Graph from "../components/group/graph/Graph";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null); // 🔑 shared state

  const show = () => {
    setShowModal(!showModal);
  };

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
        <Graph selectedGroupId={selectedGroupId} />
      </div>
    </div>
  );
}

export default Home;
