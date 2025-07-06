import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Tasks from "../components/task/Tasks";
import Groups from "../components/group/Groups";

function Home() {
  return (
    <div>
      <Tasks />
      <Groups />
    </div>
  );
}

export default Home;
