import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const RecipeGrid = ({ recipes, onSelectRecipe }) => {
  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((recipe, i) => (
        <motion.div
          key={recipe.title}
          className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => onSelectRecipe(recipe)}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg text-orange-600 mb-2 text-center">
              {recipe.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              ⏱️ {recipe.time} min • 🍽️ {recipe.servings} servings
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeGrid;
