import React from "react";
import "./RecipeList.css";

const RecipeList = ({ recipes, onRecipeClick }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-results">
        No recipes found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <table className="recipe-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Ready in (min)</th>
            <th>Servings</th>
            <th>Health Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id} className="recipe-row">
              <td>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
              </td>
              <td className="recipe-title">{recipe.title}</td>
              <td className="centered">{recipe.readyInMinutes || "N/A"}</td>
              <td className="centered">{recipe.servings || "N/A"}</td>
              <td className="centered">
                <span className="health-score">
                  {recipe.healthScore || "N/A"}
                </span>
              </td>
              <td className="centered">
                <button
                  className="view-button"
                  onClick={() => onRecipeClick(recipe.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList;
