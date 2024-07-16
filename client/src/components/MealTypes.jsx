import React, { useEffect, useState } from 'react';
import Card from './Card';

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
    const fetchRecipe = async () => {
      const response = await fetch(
        `/api/recipes/search/&mealType=${selectedType}`
      );
      const data = await response.json();
      setContent(data);
    };
    fetchRecipe();
  }, [tabs]);
  // console.log(content);
  return (
    <div>
      <div className="flex justify-around border-b py-4">
        {mealOptions.map((meal, i) => {
          return (
            <div
              key={i}
              onClick={() => updateTab(meal, i)}
              className={tabs === i && ' '}
            >
              {meal}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-y-6">
        {content &&
          content.map((hits, i) => {
            if (i < 8) return <Card key={i} data={hits.recipe} />;
          })}
      </div>
    </div>
  );
}
