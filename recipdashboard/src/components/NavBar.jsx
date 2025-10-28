import React from "react";
import "./NavBar.css";

const NavBar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="navbar">
      <div className="navbar-header">
        <h2>RecipeFind</h2>
      </div>
      <nav className="navbar-links">
        <button
          className={currentPage === "dashboard" ? "active" : ""}
          onClick={() => setCurrentPage("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={currentPage === "search" ? "active" : ""}
          onClick={() => setCurrentPage("search")}
        >
          🔍 Search
        </button>
        <button
          className={currentPage === "about" ? "active" : ""}
          onClick={() => setCurrentPage("about")}
        >
          ℹ️ About
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
