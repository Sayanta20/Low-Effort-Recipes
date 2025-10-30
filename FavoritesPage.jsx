import React, { useState, useEffect } from "react";

const FavoritesPage = ({ goBack }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (title) => {
    const updated = favorites.filter((r) => r.title !== title);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">My Favorites ❤️</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No recipes saved yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <div
              key={recipe.title}
              className="bg-white shadow-xl rounded-2xl p-4 w-64 flex flex-col items-center"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-xl mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-center">{recipe.title}</h3>
              <button
                onClick={() => removeFavorite(recipe.title)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl mt-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={goBack}
        className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-orange-600 transition"
      >
        Back
      </button>
    </div>
  );
};

export default FavoritesPage;
