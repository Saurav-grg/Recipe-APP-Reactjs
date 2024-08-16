import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';

export default function Recipes() {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const queryString = window.location.search.substring(1);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/recipes/search/${queryString}`);
        const data = await response.json();
        // console.log('Initial data fetched:', data);
        setContent(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [queryString]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom
    if (scrollTop + windowHeight >= documentHeight - 100) {
      // User is near the bottom of the page
      setLoading(true);
      setTimeout(() => {
        fetchNextPage();
        // console.log('User has scrolled to the bottom!');
      }, 2000);
      // Perform action here, e.g., loading more content
    }
  };
  useEffect(() => {
    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const fetchNextPage = async () => {
    // console.log('User has scrolled to the function!');
    // content && console.log(content._links.next.href);

    try {
      if (content && content._links && content._links.next) {
        const response = await fetch(`${content._links.next.href}`);
        const newData = await response.json();

        // Combine existing content with new content
        setContent((prevContent) => {
          const combinedContent = {
            ...newData,
            hits: [...(prevContent.hits || []), ...(newData.hits || [])],
            _links: newData._links, // Preserve the new _links
          };
          return combinedContent;
        });
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[1150px] mx-auto">
      <div className="bg-purple-200">
        <div>filter</div>
        <div className="flex">
          <div>cooking time</div>
          <div>calories</div>
        </div>
      </div>
      <div>Results</div>
      <div className="grid grid-cols-5 gap-y-6 pb-10">
        {content
          ? content.hits.map((hit, i) => {
              return <Card key={i} data={hit} />;
            })
          : Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      {loading && (
        <div class="flex gap-2 w-20 mx-auto">
          <div class="w-5 h-5 rounded-full animate-bounce bg-blue-600"></div>
          <div class="w-5 h-5 rounded-full animate-bounce bg-blue-600"></div>
          <div class="w-5 h-5 rounded-full animate-bounce bg-blue-600"></div>
        </div>
      )}
    </div>
  );
}
