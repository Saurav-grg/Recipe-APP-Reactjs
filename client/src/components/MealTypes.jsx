import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import { useNavigate } from 'react-router-dom';

export default function MealTypes() {
  const [tabs, setTabs] = useState(0);
  const [selectedType, setSelectedType] = useState('Breakfast');
  const [content, setContent] = useState({}); // Initialize content as an object
  const navigate = useNavigate();

  const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime'];

  function updateTab(meal, id) {
    setSelectedType(meal);
    setTabs(id);
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      // Check if data for the selectedType is already stored
      if (!content[selectedType]) {
        const response = await fetch(
          `/api/recipes/search/mealType=${selectedType}`
        );
        const data = await response.json();
        setContent((prevContent) => ({
          ...prevContent,
          [selectedType]: data, // Store the fetched data under the selectedType
        }));
      }
    };
    fetchRecipe();
  }, [tabs]);

  const handleClick = (str) => {
    const qry = `&mealType=${str}`;
    navigate(`/recipes?${qry}`);
  };
  return (
    <div className="max-w-[1250px] mx-auto pb-4">
      <div className="flex justify-around border-b text-accent font-semibold  cursor-pointer">
        {mealOptions.map((meal, i) => (
          <div
            key={i}
            onClick={() => updateTab(meal, i)}
            className={`py-4 px-4 ${
              tabs === i && 'border-b-4 border-orange-400 bg-gray-200'
            }`}
          >
            {meal}
          </div>
        ))}
      </div>
      <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-2 justify-items-center">
        {/* {content[selectedType]
          ? content[selectedType].hits
              .slice(0, 10)
              .map((hit, i) => <Card key={i} data={hit} />)
          : Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)} */}
        {content[selectedType]?.hits?.length
          ? content[selectedType].hits
              .slice(0, 10)
              .map((hit, i) => <Card key={i} data={hit} />)
          : Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      <div className="w-28 mx-auto">
        <button
          onClick={() => handleClick(selectedType)}
          className="border px-1 py-2 border-accent text-accent font-semibold "
        >
          show more...
        </button>
      </div>
    </div>
  );
}
