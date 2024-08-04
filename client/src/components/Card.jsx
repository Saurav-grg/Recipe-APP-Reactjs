import React from 'react';
import { FaRegClock } from 'react-icons/fa6';

export default function Card({ data }) {
  //   console.log(data);
  if (data)
    return (
      <div className="w-[210px] shadow-lg">
        <div>
          <img
            className="w-full h-40 object-cover rounded-sm"
            src={data.images.REGULAR.url}
            alt="hello"
          />
        </div>
        <div className="px-2 pb-2">
          <p className=" h-14 pt-2 overflow-auto">{data.label}</p>
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 text-gray-600">
              {/* <img src="calories.png" alt="kcal icon" className="w-6 " /> */}
              {Math.round(data.calories)} kcal
            </div>
            <div className="flex items-center gap-1">
              <FaRegClock />
              {data.totalTime} minutes
            </div>
          </div>
        </div>
      </div>
    );
}
