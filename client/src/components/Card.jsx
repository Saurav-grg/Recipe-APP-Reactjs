import React from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
export default function Card({ data }) {
  // console.log(data._links.self.href);

  // console.log(id);
  if (data) {
    const href = data._links.self.href;
    const id = href.split('/v2/')[1].split('?')[0];
    function formatTime(totalMinutes) {
      if (totalMinutes < 60) {
        return `${totalMinutes} minutes`;
      } else {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
      }
    }
    return (
      // <div>HEllo</div>
      <Link to={`/recipes/${id}`}>
        <div className="w-[210px] shadow-lg hover:-translate-y-2 duration-500">
          <div>
            <img
              className="w-full h-40 object-cover rounded-sm"
              src={data.recipe.images.REGULAR.url}
              alt="hello"
            />
          </div>
          <div className="px-2 pb-2">
            <p className=" h-14 pt-2 overflow-auto font-semibold">
              {data.recipe.label}
            </p>
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 text-gray-600">
                {/* <img src="calories.png" alt="kcal icon" className="w-6 " /> */}
                {Math.round(data.recipe.calories)} kcal
              </div>
              <div className="flex items-center gap-1 to-gray-600">
                <FaRegClock />
                {formatTime(data.recipe.totalTime)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
