import { Clock, Users, Heart } from 'lucide-react';
import { Link } from 'react-router';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link to={`/recipe/${recipe.id}`}>
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-48 object-cover cursor-pointer"
          />
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
        >
          <Heart
            className={`w-6 h-6 hover:cursor-pointer ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
          />
        </button>
      </div>

      <div className="p-4">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-500">{recipe.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

        <div className="flex items-center text-gray-500 text-sm space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} mins</span>
          </div>

          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
