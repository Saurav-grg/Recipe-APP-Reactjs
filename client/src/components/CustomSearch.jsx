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
const cuisineType = [
  { name: 'china', image: 'china.png' },
  { name: 'france', image: 'france.png' },
  { name: 'india', image: 'india.png' },
  { name: 'japan', image: 'japan.png' },
  { name: 'united-kingdom', image: 'united-kingdom.png' },
  { name: 'united-states', image: 'united-states.png' },
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

  const [recipes, setRecipes] = useState();

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
    console.log(customQry);
    const response = await fetch(`/api/recipes/search/${customQry}`);
    const data = await response.json();
    // console.log(data);
    setRecipes(data);
  };

  return (
    <div className="p-4 w-[400px]">
      <div>Random text slogan</div>
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
          {cuisineType.map((country) => {
            return (
              <div className="flex gap-1 ">
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
        <button className="bg-black text-white py-1 rounded-sm" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
