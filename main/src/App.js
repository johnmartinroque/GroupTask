import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";

import Tasks from "./components/Tasks";
import TaskDetailed from "./components/TaskDetailed";
import LoginPage from "./screens/LoginPage";
import GroupDetailed from "./screens/GroupDetailed";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskDetailed />} />
          <Route path="/tasks/:taskId" element={<TaskDetailed />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/group/:groupId" element={<GroupDetailed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
