import React from "react";
import "./Card.css";

const Card = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h1 className="card-value">{value}</h1>
      </div>
    </div>
  );
};

export default Card;
