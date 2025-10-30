import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

export const fetchRecipes = async (filters, count = 6) => {
  const recipes = [];

  while (recipes.length < count) {
    try {
      const response = await axios.get(API_URL);
      const meal = response.data.meals[0];

      // Extract ingredients
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const item = meal[`strIngredient${i}`];
        if (item && item.trim() !== "") ingredients.push(item.toLowerCase());
      }

      // Skip recipes with too many ingredients
      if (ingredients.length > filters.maxIngredients) continue;

      // Skip if recipe has ingredients not in user's list
      if (filters.availableIngredients) {
        const available = filters.availableIngredients
          .split(",")
          .map((i) => i.trim().toLowerCase());
        const hasExtra = ingredients.some((ing) => !available.includes(ing));
        if (hasExtra) continue;
      }

      recipes.push({
        title: meal.strMeal,
        image: meal.strMealThumb,
        instructions: meal.strInstructions,
        video: meal.strYoutube,
        ingredients: ingredients.slice(0, filters.maxIngredients),
        servings: 3,
        time: filters.maxTime,
      });
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  return recipes;
};
