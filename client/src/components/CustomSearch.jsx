import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const dietOptions = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'high-fiber', label: 'High Fiber' },
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
const cuisineType = [
  { name: 'Chinese', image: 'china.png' },
  { name: 'French', image: 'france.png' },
  { name: 'Indian', image: 'india.png' },
  { name: 'Japanese', image: 'japan.png' },
  { name: 'British', image: 'united-kingdom.png' },
  { name: 'American', image: 'united-states.png' },
];

// const mealOptions = [
//   { value: 'Breakfast', label: 'Breakfast' },
//   { value: 'Lunch', label: 'Lunch' },
//   { value: 'Dinner', label: 'Dinner' },
//   { value: 'Snack', label: 'Snack' },
//   { value: 'Teatime', label: 'Teatime' },
//   // ... add more options as needed
// ];
/* */
/* */
/* */
export default function CustomSearch() {
  const [foodTitle, setFoodTitle] = useState(null);
  const [selectedDiets, setSelectedDiets] = useState(null);
  const [healthLabel, setHealthLabel] = useState(null);
  const [cuisine, setCuisine] = useState([]);

  // const [recipes, setRecipes] = useState();
  const navigate = useNavigate();

  let dietQry = '';
  let healthQry = '';
  let cuisineQry = '';

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (cuisine.includes(value)) {
      setCuisine(cuisine.filter((option) => option !== value));
    } else {
      setCuisine([...cuisine, value]);
    }
  };
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
    cuisine &&
      cuisine.map((cuisine) => {
        cuisineQry += `&cuisineType=${cuisine}`;
      });
    const customQry = foodQry + dietQry + healthQry + cuisineQry;
    // console.log(customQry);

    // console.log(data);
    // setRecipes(data);
    navigate(`/recipes?${customQry}`);
  };

  return (
    <div className="p-4 w-[400px]">
      <div className="text-background font-semibold text-2xl pb-4">
        Customize Your Culinary Experience with Recipes that Fit Your Lifestyle.
      </div>
      <form onSubmit={handleCustomSearch} className="flex flex-col gap-3">
        <input
          type="text"
          onChange={(e) => setFoodTitle(e.target.value)}
          placeholder="chicken"
          className="py-2 px-2 border-2 rounded focus:outline-blue-600"
        />
        <Select
          className="flex-1"
          defaultValue={selectedDiets}
          onChange={setSelectedDiets}
          options={dietOptions}
          isMulti
          placeholder="diet options"
        />
        <Select
          className="flex-1"
          defaultValue={healthLabel}
          onChange={setHealthLabel}
          options={healthOptions}
          isMulti
          placeholder="health label"
        />
        <div className="flex gap-10 overflow-auto p-1">
          {cuisineType.map((country, i) => {
            return (
              <div key={i} className="flex gap-1 ">
                <input
                  type="checkbox"
                  name={country.name}
                  value={country.name}
                  onChange={handleCheckbox}
                />
                <img
                  src={country.image}
                  alt="china map"
                  className="w-10 rounded-full"
                />
              </div>
            );
          })}
        </div>
        <button
          className="bg-black text-background py-1 rounded-sm hover:text-gray-300 active:scale-105"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
