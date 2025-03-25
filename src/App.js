import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import JobDetails from "./pages/jobDetails";
import AddJob from "./pages/addJob";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </Router>
  );
};

export default App;
