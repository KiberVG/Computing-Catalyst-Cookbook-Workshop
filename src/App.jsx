import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { recipesData } from './data/recipesData';

export default function App() {
  const [recipes, setRecipes] = useState(recipesData); // comment this out when using firebase
  // WORKSHOP: Replace static data with Firestore data ///////////////////////////



  // WORKSHOP: End of Firestore fetch logic
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addRecipe = (recipe) => {
    setRecipes([recipe, ...recipes]);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Header />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <Header />
              <AddRecipeForm onAddRecipe={addRecipe} />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <PrivateRoute>
              <Header />
              <RecipeDetail recipes={recipes} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
