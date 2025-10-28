import React from "react";
import "./Filter.css";

const Filter = ({ filterText, setFilterText }) => {
  return (
    <div className="filter-container">
      <label htmlFor="diet-filter">Filter by Diet:</label>
      <input
        id="diet-filter"
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Type diet type (e.g., vegetarian, vegan, gluten free)"
        className="filter-input"
      />
    </div>
  );
};

export default Filter;
