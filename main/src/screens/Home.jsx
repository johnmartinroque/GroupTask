import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import Tasks from "../components/Tasks";
import Text from "../components/Text";
import { Button } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Tasks />
      <Text />
    </div>
  );
}

export default Home;
