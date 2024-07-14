import React from 'react';
import CustomSearch from '../components/CustomSearch';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-around items-center gap-10 bg-background">
        <CustomSearch />
        <Featured />
      </div>
    </main>
  );
}
