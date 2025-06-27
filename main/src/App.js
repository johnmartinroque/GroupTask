import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Tasks from "./components/Tasks";
import TaskDetailed from "./components/TaskDetailed";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task" element={<TaskDetailed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
