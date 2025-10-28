import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Card from "./components/Card";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

const API_KEY =
  import.meta.env.VITE_ACCESS_API_KEY || "d20c1d56d38447758690db69679d22f4";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterText, setFilterText] = useState("");

  // Fetch recipes with debouncing - only makes ONE API call after user stops typing
  useEffect(() => {
    const debounceTimer = setTimeout(
      async () => {
        try {
          setLoading(true);

          // If searchTerm is empty, fetch initial 10 recipes
          // If searchTerm has value, search for matching recipes
          const url = searchTerm
            ? `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchTerm}&number=20&addRecipeInformation=true&fillIngredients=true`
            : `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true&fillIngredients=true`;

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }

          const data = await response.json();
          setRecipes(data.results || []);
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setRecipes([]);
        } finally {
          setLoading(false);
        }
      },
      searchTerm ? 500 : 0
    ); // Debounce search, but load initial recipes immediately

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Filter recipes based on filter text only (search is handled by API)
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFilter =
      !filterText ||
      (recipe.diets &&
        recipe.diets.some((diet) =>
          diet.toLowerCase().includes(filterText.toLowerCase())
        ));

    return matchesFilter;
  });

  // Calculate summary statistics
  const totalRecipes = filteredRecipes.length;

  const avgReadyTime =
    filteredRecipes.length > 0
      ? Math.round(
          filteredRecipes.reduce(
            (sum, recipe) => sum + (recipe.readyInMinutes || 0),
            0
          ) / filteredRecipes.length
        )
      : 0;

  const avgHealthScore =
    filteredRecipes.length > 0
      ? Math.round(
          filteredRecipes.reduce(
            (sum, recipe) => sum + (recipe.healthScore || 0),
            0
          ) / filteredRecipes.length
        )
      : 0;

  const healthyRecipes = filteredRecipes.filter(
    (recipe) => recipe.healthScore && recipe.healthScore >= 70
  ).length;

  const handleRecipeClick = async (recipeId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }

      const data = await response.json();
      alert(
        `Recipe: ${data.title}\n\nInstructions: ${
          data.instructions || "No instructions available"
        }\n\nSource: ${data.sourceUrl || "N/A"}`
      );
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      alert("Failed to load recipe details");
    }
  };

  return (
    <div className="app-container">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="main-content">
        <Header
          title="Recipe Dashboard"
          subtitle="Discover delicious recipes from around the world"
        />

        {/* Summary Statistics Cards */}
        <div className="stats-container">
          <Card title="Total Recipes" value={totalRecipes} icon="🍽️" />
          <Card title="Avg Ready Time" value={`${avgReadyTime}m`} icon="⏱️" />
          <Card title="Avg Health Score" value={avgHealthScore} icon="💚" />
          <Card title="Healthy Recipes" value={healthyRecipes} icon="🥗" />
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Filter */}
        <Filter filterText={filterText} setFilterText={setFilterText} />

        {/* Recipe List */}
        {loading ? (
          <div className="loading">Loading recipes...</div>
        ) : (
          <RecipeList
            recipes={filteredRecipes}
            onRecipeClick={handleRecipeClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
