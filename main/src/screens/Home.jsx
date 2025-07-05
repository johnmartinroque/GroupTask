import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import Tasks from "../components/Tasks";

import { Button } from "react-bootstrap";
import Groups from "../components/Groups";

function Home() {
  return (
    <div>
      <Tasks />
    </div>
  );
}

export default Home;
