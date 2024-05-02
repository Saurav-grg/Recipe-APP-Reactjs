import React from 'react';
import CustomSearch from '../components/CustomSearch';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-indigo-500">
      <div className="flex justify-around items-center gap-10">
        <CustomSearch />
        <Featured />
      </div>
    </main>
  );
}
