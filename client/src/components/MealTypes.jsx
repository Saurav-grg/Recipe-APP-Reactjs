import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';

export default function MealTypes() {
  const [tabs, setTabs] = useState(0);
  const [selectedType, setSelectedType] = useState('Breakfast');
  const [content, setContent] = useState({}); // Initialize content as an object

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

  return (
    <div>
      <div className="flex justify-around border-b cursor-pointer">
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
      <div className="grid grid-cols-6 gap-y-6">
        {content[selectedType]
          ? content[selectedType].hits
              .slice(0, 12)
              .map((hit, i) => <Card key={i} data={hit} />)
          : Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
