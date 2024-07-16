import React from 'react';

export default function Card({ data }) {
  //   console.log(data);
  if (data)
    return (
      <div>
        <div>
          <img
            className="w-32 h-32 object-cover"
            src={data.images.REGULAR.url}
            alt="hello"
          />
        </div>
        <div>
          <p>{data.label}</p>
        </div>
      </div>
    );
}
