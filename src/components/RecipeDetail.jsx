import { ArrowLeft, Clock, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';

export default function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert id to number if recipe ids are numbers, or string if they are strings.
  // Assuming they are numbers based on typical data, but let's check.
  // If recipesData has number IDs, we need to parse.
  // Let's assume loose comparison or string conversion.
  const recipe = recipes.find(r => r.id.toString() === id);

  if (!recipe) return <div className="text-center mt-10">Recipe not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-orange-500 hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg shadow"
      />

      <h1 className="text-3xl font-bold mt-6">{recipe.title}</h1>
      <p className="text-gray-600 mt-2">{recipe.description}</p>

      <div className="flex items-center space-x-6 mt-4 text-gray-700">
        <div className="flex items-center space-x-1">
          <Clock className="w-5 h-5" />
          <span>{recipe.prepTime + recipe.cookTime} mins</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-5 h-5" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Ingredients</h2>
      <ul className="list-disc ml-6 text-gray-700">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Instructions</h2>
      <ol className="list-decimal ml-6 text-gray-700 space-y-1">
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
