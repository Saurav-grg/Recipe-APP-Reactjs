import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardSkeleton from './CardSkeleton';

export default function MealTypes() {
  const [tabs, setTabs] = useState(0);
  const [selectedType, setSelectedType] = useState('Breakfast');
  const [content, setContent] = useState();

  function updateTab(meal, id) {
    setSelectedType(meal);
    setTabs(id);
  }
  const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime'];
  useEffect(() => {
    setContent(null);
    const fetchRecipe = async () => {
      const response = await fetch(
        `/api/recipes/search/mealType=${selectedType}`
      );
      const data = await response.json();
      setContent(data);
    };
    fetchRecipe();
  }, [tabs]);
  // console.log(content);
  return (
    <div>
      <div className="flex justify-around border-b cursor-pointer">
        {mealOptions.map((meal, i) => {
          return (
            <div
              key={i}
              onClick={() => updateTab(meal, i)}
              className={`py-4 px-4 ${
                tabs === i && 'border-b-4 border-orange-400 bg-gray-200'
              }`}
            >
              {meal}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-6 gap-y-6">
        {content
          ? content.map((hits, i) => {
              if (i < 12) return <Card key={i} data={hits} />;
            })
          : Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
