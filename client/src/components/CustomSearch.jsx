import React, { useState } from 'react';
import Select from 'react-select';

const dietOptions = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'high-fibre', label: 'High Fibre' },
  { value: 'high-protein', label: 'High protein' },
  { value: 'low-carb', label: 'Low Carb' },
  { value: 'low-fat', label: 'Low Fat' },
  { value: 'low-sodium', label: 'Low Sodium' },
];
const healthOptions = [
  { value: 'alcohol-free', label: 'Alcohol Free' },
  { value: 'alcohol-free', label: 'Alcohol Free' },
  { value: 'celery-free', label: 'Celery Free' },
  { value: 'dairy-free', label: 'Dairy Free' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'keto-friendly', label: 'Keto friendly' },
  { value: 'low-sugar', label: 'Low sugar' },
];
const mealOptions = [
  { value: 'Breakfast', label: 'Breakfast' },
  { value: 'Lunch', label: 'Lunch' },
  { value: 'Dinner', label: 'Dinner' },
  { value: 'Snack', label: 'Snack' },
  { value: 'Teatime', label: 'Teatime' },
  // ... add more options as needed
];
const cuisineTypeOptions = [
  { value: 'American', label: 'American' },
  { value: 'Asian', label: 'Asian' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Mexican', label: 'Mexican' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'French', label: 'French' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Middle Eastern', label: 'Middle Eastern' },

  // ... add more options as needed
];

/* */
/* */
/* */
export default function CustomSearch() {
  const [foodTitle, setFoodTitle] = useState(null);
  const [selectedDiets, setSelectedDiets] = useState(null);
  const [healthLabel, setHealthLabel] = useState(null);
  const [mealType, setMealTypes] = useState(null);
  const [cuisineType, setCuisineType] = useState(null);

  const [recipes, setRecipes] = useState();

  let dietQry = '';
  let healthQry = '';
  let mealTypeQry = '';
  let cuisineTypeQry = '';
  const handleCustomSearch = async (e) => {
    e.preventDefault();

    const foodQry = `q=${foodTitle}`;
    selectedDiets &&
      selectedDiets.map((diet) => {
        dietQry += `&diet=${diet.value}`;
      });
    healthLabel &&
      healthLabel.map((label) => {
        healthQry += `&health=${label.value}`;
      });
    mealType &&
      mealType.map((meal) => {
        mealTypeQry += `&mealType=${meal.value}`;
      });
    cuisineType &&
      cuisineType.map((cuisine) => {
        cuisineTypeQry += `&cuisineType=${cuisine.value}`;
      });
    const customQry = foodQry + dietQry + mealTypeQry + cuisineTypeQry;
    console.log(customQry);
    const response = await fetch(`/api/recipes/search/${customQry}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data);
  };

  return (
    <div className=" p-4 w-2/4">
      <div>Random text slogan</div>
      <form onSubmit={handleCustomSearch} className="flex flex-col gap-3">
        <input
          type="text"
          onChange={(e) => setFoodTitle(e.target.value)}
          placeholder="chicken"
          className="outline-gray-200 outline py-1 px-2 rounded-md"
        />

        <Select
          defaultValue={selectedDiets}
          onChange={setSelectedDiets}
          options={dietOptions}
          isMulti
          placeholder="diet options"
        />
        <Select
          defaultValue={healthLabel}
          onChange={setHealthLabel}
          options={healthOptions}
          isMulti
          placeholder="health label"
        />
        <Select
          defaultValue={mealType}
          onChange={setMealTypes}
          options={mealOptions}
          isMulti
          placeholder="meal type"
        />
        <Select
          defaultValue={cuisineType}
          onChange={setCuisineType}
          options={cuisineTypeOptions}
          isMulti
          placeholder="cuisine type"
        />
        <button className="bg-black text-white py-1 rounded-sm" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
