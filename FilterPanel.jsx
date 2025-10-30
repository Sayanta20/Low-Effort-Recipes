import React, { useState } from "react";
import { COMMON_INGREDIENTS } from "../data/ingredients";

const FilterPanel = ({ filters, setFilters }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, availableIngredients: value });

    const lastWord = value.split(",").pop().trim().toLowerCase();

    if (lastWord.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = COMMON_INGREDIENTS.filter(
      (ing) =>
        ing.toLowerCase().includes(lastWord) &&
        !value.toLowerCase().split(",").includes(ing)
    );
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    const parts = filters.availableIngredients.split(",");
    parts[parts.length - 1] = suggestion;
    const newValue = parts.join(", ") + ", ";
    setFilters({ ...filters, availableIngredients: newValue });
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 my-4 items-start md:items-center w-full max-w-xl mx-auto relative">
      <div>
        <label className="block text-sm font-semibold">Max Ingredients</label>
        <input
          type="number"
          min="1"
          max="5"
          value={filters.maxIngredients}
          onChange={(e) =>
            setFilters({ ...filters, maxIngredients: e.target.value })
          }
          className="border rounded-md px-2 py-1 w-20 text-center"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold">Max Cook Time (min)</label>
        <input
          type="number"
          min="10"
          max="60"
          value={filters.maxTime}
          onChange={(e) =>
            setFilters({ ...filters, maxTime: e.target.value })
          }
          className="border rounded-md px-2 py-1 w-24 text-center"
        />
      </div>

      <div className="flex flex-col w-full md:w-64 relative">
        <label className="block text-sm font-semibold">Available Ingredients</label>
        <input
          type="text"
          placeholder="e.g., chicken, potatoes"
          value={filters.availableIngredients}
          onChange={handleInputChange}
          className="border rounded-md px-2 py-1 w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-16 left-0 right-0 bg-white border rounded-md shadow-md z-10 max-h-40 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="px-2 py-1 hover:bg-orange-100 cursor-pointer"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
