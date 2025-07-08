import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Tasks from "../components/task/Tasks";
import Groups from "../components/group/Groups";
import MyGroups from "../components/group/MyGroups";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(true);
    if (showModal) {
      setShowModal(false);
    }
  };
  return (
    <div>
      {/*    */}
      <Tasks />
      <Groups />
      <MyGroups />
    </div>
  );
}

export default Home;
