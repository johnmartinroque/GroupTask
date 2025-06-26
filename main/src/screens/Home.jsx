import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import Tasks from "../components/Tasks";

import { Button } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Tasks />
    </div>
  );
}

export default Home;
