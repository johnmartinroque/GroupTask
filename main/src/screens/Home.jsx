import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Tasks from "../components/task/Tasks";
import Groups from "../components/group/Groups";
import MyGroups from "../components/group/MyGroups";

function Home() {
  return (
    <div>
      <Tasks />
      <MyGroups />
    </div>
  );
}

export default Home;
