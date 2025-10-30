import React from "react";
import FilterPanel from "./FilterPanel";
import { motion } from "framer-motion";

const SplashPage = ({ onFindRecipe, filters, setFilters }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h1
        className="text-5xl font-extrabold text-orange-600 mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
  Low Effort Recipes 🍽️
</motion.h1>


      <p className="text-lg text-gray-600 max-w-md">
        Simple, delicious meals made with ≤5 ingredients, ready in under an hour.
      </p>

      <FilterPanel filters={filters} setFilters={setFilters} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFindRecipe}
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-orange-600 transition"
      >
        Find Me A Recipe!
      </motion.button>

      <footer className="mt-10 text-gray-400 text-sm">
        Built for home cooks who hate complexity ❤️
      </footer>
    </div>
  );
};

export default SplashPage;
