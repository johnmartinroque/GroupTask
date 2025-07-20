import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Tasks from "../components/task/Tasks";
import Groups from "../components/group/Groups";
import MyGroups from "../components/group/MyGroups";
import "../src_css/screens/Home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(true);
    if (showModal) {
      setShowModal(false);
    }
  };
  return (
    <div id="home">
      <div className="left-side">
        <div className="top-left">
          <Tasks />
        </div>
        <div className="bottom-left">
          <MyGroups />
        </div>
      </div>

      <div className="right-side">
        <Groups />
      </div>
    </div>
  );
}

export default Home;
