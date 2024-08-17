import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';

export default function Recipes() {
  const [content, setContent] = useState(null);
  const [filteredContent, setFilteredContent] = useState(null); // State to hold filtered data
  const [loading, setLoading] = useState(false);

  const [cookingTime, setCookingTime] = useState('');
  const [calories, setCalories] = useState('');

  const queryString = window.location.search.substring(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/recipes/search/${queryString}`);
        const data = await response.json();
        setContent(data);
        setFilteredContent(data); // Initially, filtered content is the same as content
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [queryString]);

  const handleFilter = () => {
    if (!content || !content.hits) return;

    let filteredHits = content.hits;

    // Apply cooking time filter
    if (cookingTime) {
      filteredHits = filteredHits.filter((hit) => {
        const time = parseInt(hit.recipe.totalTime, 10);
        if (cookingTime === '10') return time < 10;
        if (cookingTime === '30') return time < 30;
        if (cookingTime === '60') return time < 60;
        if (cookingTime === '61') return time >= 60;
        return true;
      });
    }

    // Apply calories filter
    if (calories) {
      filteredHits = filteredHits.filter((hit) => {
        const cal = parseInt(hit.recipe.calories, 10);
        if (calories === '300') return cal < 300;
        if (calories === '300-700') return cal >= 300 && cal <= 700;
        if (calories === '700-1200') return cal >= 700 && cal <= 1200;
        if (calories === '1200') return cal > 1200;
        return true;
      });
    }

    setFilteredContent({ ...content, hits: filteredHits });
  };

  const fetchNextPage = async () => {
    if (content && content._links && content._links.next) {
      try {
        setLoading(true);
        const response = await fetch(`${content._links.next.href}`);
        const newData = await response.json();
        setContent((prevContent) => ({
          ...newData,
          hits: [...prevContent.hits, ...newData.hits],
        }));
        setFilteredContent((prevContent) => ({
          ...newData,
          hits: [...prevContent.hits, ...newData.hits],
        }));
      } catch (error) {
        console.error('Error fetching next page:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [content]);

  return (
    <div className="max-w-[1150px] mx-auto">
      <form
        className="bg-purple-200"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <div>Filter</div>
        <div className="flex">
          <div>
            Cooking Time
            <select
              name="time"
              id="time"
              onChange={(e) => setCookingTime(e.target.value)}
            >
              <option value="">Select Time</option>
              <option value="10">Less than 10 mins</option>
              <option value="30">Less than 30 mins</option>
              <option value="60">Less than 1 hour</option>
              <option value="61">More than 1 hour</option>
            </select>
          </div>
          <div>
            Calories
            <select
              name="calories"
              id="calories"
              onChange={(e) => setCalories(e.target.value)}
            >
              <option value="">Select Calories</option>
              <option value="300">Less than 300</option>
              <option value="300-700">300 to 700</option>
              <option value="700-1200">700 to 1200</option>
              <option value="1200">More than 1200</option>
            </select>
          </div>
          <button type="submit">Apply Filter</button>
        </div>
      </form>

      <div>Results</div>
      <div className="grid grid-cols-5 gap-y-6 pb-10">
        {filteredContent
          ? filteredContent.hits.map((hit, i) => <Card key={i} data={hit} />)
          : Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>

      {loading && (
        <div className="flex gap-2 w-20 mx-auto">
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        </div>
      )}
    </div>
  );
}
