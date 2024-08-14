import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';

export default function Recipes() {
  const [content, setContent] = useState();

  const queryString = window.location.search.substring(1);
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipes/search/${queryString}`);
      const data = await response.json();
      setContent(data);
    };
    fetchRecipe();
  }, [queryString]);
  // content && console.log(content);
  return (
    <>
      <div className="bg-purple-200">
        <div>filter</div>
        <div className="flex">
          <div>cooking time</div>
          <div>calories</div>
        </div>
      </div>
      <div>Results</div>
      <div className="grid grid-cols-6 gap-y-6">
        {content
          ? content.map((hits, i) => {
              if (i < 12) return <Card key={i} data={hits} />;
            })
          : Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </>
  );
}
