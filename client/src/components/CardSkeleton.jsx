import React from 'react';

export default function CardSkeleton() {
  return (
    //  <div className="w-[210px] h-60 bg-neutral-800 flex rounded flex-col gap-2 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
    <div className="w-[210px] h-60 bg-neutral-100 flex rounded flex-col  gap-2">
      <div className="w-full rounded h-40 bg-gray-300 "></div>
      <div className="px-2 flex flex-col gap-2">
        <p className=" h-6 rounded-3xl pt-2 animate-pulse bg-neutral-400"></p>
        <div className="flex gap-3 items-center ">
          <div className="bg-gray-300 w-20 h-6 animate-pulse rounded-3xl p-2"></div>
          <div className="bg-gray-300 w-16 h-6 animate-pulse rounded-3xl p-2"></div>
        </div>
      </div>
    </div>
  );
}
