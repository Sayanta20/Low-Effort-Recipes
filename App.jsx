import React, { useState } from "react";
import SplashPage from "./component/SplashPage";
import RecipeDetail from "./component/RecipeDetail";
import FavoritesPage from "./component/FavoritesPage";
import RecipeGrid from "./component/RecipeGrid";
import { fetchRecipes } from "./services/recipeAPI";

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({
    maxIngredients: 5,
    maxTime: 60,
    availableIngredients: "",
  });

  const handleFindRecipes = async () => {
    const data = await fetchRecipes(filters, 6);
    setRecipes(data);
    setSelectedRecipe(null);
    setShowFavorites(false);
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      {showFavorites ? (
        <FavoritesPage goBack={() => setShowFavorites(false)} />
      ) : !recipes.length ? (
        <SplashPage
          onFindRecipe={handleFindRecipes}
          filters={filters}
          setFilters={setFilters}
        />
      ) : selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          onAnotherRecipe={handleFindRecipes}
        />
      ) : (
        <RecipeGrid recipes={recipes} onSelectRecipe={handleSelectRecipe} />
      )}

      {!showFavorites && recipes.length > 0 && !selectedRecipe && (
        <button
          onClick={handleFindRecipes}
          className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          🔄 Refresh Recipes
        </button>
      )}

      {!showFavorites && (
        <button
          onClick={() => setShowFavorites(true)}
          className="fixed bottom-6 left-6 bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          ❤️ Favorites
        </button>
      )}
    </div>
  );
};

export default App;
