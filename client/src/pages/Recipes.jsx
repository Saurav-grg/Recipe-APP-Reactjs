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
        if (queryString) {
          setLoading(true);
          const response = await fetch(`/api/recipes/search/${queryString}`);
          const data = await response.json();
          setContent(data);
          setFilteredContent(data); // Initially, filtered content is the same as content
        }
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
      // console.log('calling function...');
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
      // console.log('fetching next page...');
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
    <div className="max-w-[1150px] mx-auto flex flex-col gap-6">
      <form
        className="border-b-2 shadow-xl p-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilter();
        }}
      >
        <div className="flex gap-8">
          <div className="p-2 border rounded bg-white text-accent border-accent">
            Filters
          </div>

          <div className=" bg-white text-accent  rounded px-2 py-1">
            Cooking Time
            <select
              className="border border-accent text-green-700 font-normal ml-2 rounded-md mt-1"
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
          <div className="bg-white text-accent  rounded px-2 py-1">
            Calories
            <select
              className="border border-accent text-green-700 font-normal ml-2 rounded-md mt-1"
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
          <button
            className="bg-accent text-white px-2 py-2 font-semibold rounded  hover:shadow-lg active:opa"
            type="submit"
          >
            Apply Filter
          </button>
        </div>
      </form>

      <div className="font-semibold text-xl text-green-500 underline">
        Results
      </div>
      <div className="grid grid-cols-5 gap-y-6 pb-10">
        {/* { filteredContent
          ? filteredContent.hits.map((hit, i) => <Card key={i} data={hit} />)
          : Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)} */}
        {/* {loading ? (
          Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
        ) : filteredContent ? (
          filteredContent.hits.map((hit, i) => {
            return <Card key={i} data={hit} />;
          })
        ) : queryString ? (
          <div>Loading recipes...</div>
        ) : (
          <div>Enter a search query to see results.</div>
        )} */}
        {queryString ? (
          filteredContent ? (
            filteredContent.hits.map((hit, i) => <Card key={i} data={hit} />)
          ) : (
            Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          )
        ) : (
          <div className="text-red-500 w-[350px] bg-red-100 p-2 rounded">
            Enter a search query to see results !!!
          </div>
        )}
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
