import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUniversity from "./components/AddUniversity";
import UpdateUniversity from "./components/UpdateUniversity";
import UniversitiesList from "./components/UniversitiesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/universities" className="navbar-brand">
          University portal
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/universities"} className="nav-link">
              All Universities
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<UniversitiesList />} />
          <Route path="/universities" element={<UniversitiesList />} />
          <Route path="/add" element={<AddUniversity />} />
          <Route path="/universities/:id" element={<UpdateUniversity />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
