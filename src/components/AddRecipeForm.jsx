import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

export default function AddRecipeForm({ onAddRecipe }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: '',
    ingredients: '',
    instructions: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      ...form,
      prepTime: Number(form.prepTime),
      cookTime: Number(form.cookTime),
      servings: Number(form.servings),
      ingredients: form.ingredients.split('\n'),
      instructions: form.instructions.split('\n'),
      user_id: auth.currentUser ? auth.currentUser.uid : "anonymous"
    };


    try {
      // WORKSHOP: Add to Firestore (this one is a one liner) /////////////////////////

      const docRef = await addDoc(collection(db, "recipes"), newRecipe)


      // Update local state via parent (change this to pass the new recipe with the generated ID)
      onAddRecipe({ id: docRef.id, ...newRecipe });
      // WORKSHOP: End of Firestore add logic
      setForm({
        title: '',
        description: '',
        image_url: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: '',
        ingredients: '',
        instructions: '',
        category: '',
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 rounded" required />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="border p-2 rounded" required />
        <input name="prepTime" placeholder="Prep Time (mins)" value={form.prepTime} onChange={handleChange} className="border p-2 rounded" required />
        <input name="cookTime" placeholder="Cook Time (mins)" value={form.cookTime} onChange={handleChange} className="border p-2 rounded" required />
        <input name="servings" placeholder="Servings" value={form.servings} onChange={handleChange} className="border p-2 rounded" required />
        <input name="difficulty" placeholder="Difficulty" value={form.difficulty} onChange={handleChange} className="border p-2 rounded" required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 rounded" required />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4"
        required
      />

      <textarea
        name="ingredients"
        placeholder="Ingredients (one per line)"
        value={form.ingredients}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4 h-32"
        required
      />

      <textarea
        name="instructions"
        placeholder="Instructions (one per line)"
        value={form.instructions}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4 h-32"
        required
      />

      <button className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
        Add Recipe
      </button>
    </form>
  );
}
