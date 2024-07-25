import React from 'react';
import CustomSearch from '../components/CustomSearch';
import Featured from '../components/Featured';
import MealTypes from '../components/MealTypes';
export default function Home() {
  return (
    <main className="">
      <div className="flex justify-around items-center gap-10 bg-gray-800">
        <CustomSearch />
        <Featured />
      </div>
      <MealTypes />
    </main>
  );
}
