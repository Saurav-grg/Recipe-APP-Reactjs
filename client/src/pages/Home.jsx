import React from 'react';
import CustomSearch from '../components/CustomSearch';
import MealTypes from '../components/MealTypes';
import HeroImage from '../components/HeroImage';
export default function Home() {
  return (
    <main className="">
      <div className="flex justify-around items-center gap-10 bg-gray-800 rounded-2xl">
        <CustomSearch />
        <HeroImage />
      </div>
      <MealTypes />
    </main>
  );
}
