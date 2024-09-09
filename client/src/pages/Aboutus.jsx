import React from 'react';

export default function Aboutus() {
  return (
    <div className="sm:flex items-center max-w-screen-xl">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
            About us
          </span>
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
            About <span className="text-indigo-600">Our Company</span>
          </h2>
          <p className="text-gray-700">
            Welcome to PickyEater! We are a team of food enthusiasts who are
            passionate about helping people find the perfect recipe. Our mission
            is to provide a platform where users can easily discover and share
            recipes, as well as connect with other foodies who share similar
            tastes and dietary needs. We believe that food should be enjoyable,
            accessible, and tailored to individual preferences. That's why we're
            dedicated to building a community that celebrates the diversity of
            food and makes cooking and sharing meals a breeze.
          </p>
        </div>
      </div>
    </div>
  );
}
