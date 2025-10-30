import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RecipeDetail = ({ recipe, onAnotherRecipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(saved.some((r) => r.title === recipe.title));
  }, [recipe]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(saved.filter((r) => r.title !== recipe.title))
      );
      setIsFavorite(false);
    } else {
      saved.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(saved));
      setIsFavorite(true);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-orange-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-orange-600 mb-3">
          {recipe.title}
        </h2>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-xl shadow-md mb-4"
        />

        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          {recipe.instructions}
        </p>

        {recipe.video && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Video</h3>
            <a
              href={recipe.video}
              target="_blank"
              className="text-orange-500 underline"
            >
              Watch on YouTube
            </a>
          </div>
        )}

        <div className="flex justify-between items-center mt-6 text-gray-600">
          <p>⏱️ {recipe.time} min</p>
          <p>🍽️ {recipe.servings} servings</p>
        </div>

        <div className="flex gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAnotherRecipe}
            className="bg-orange-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-orange-600 transition flex-1"
          >
            Show Me Another Recipe!
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFavorite}
            className={`px-6 py-3 rounded-2xl shadow-md flex-1 ${
              isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isFavorite ? "❤️ Saved" : "🤍 Save Recipe"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;
