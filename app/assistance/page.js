import React from "react";

const Assistance = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Main Grid Layout */}
      <section className="grid grid-cols-3 border h-full">
        {/* Left Section */}
        <div className="bg-gray-200 p-4">
          <h2>Left Section</h2>
          <p>This section takes 1/3 of the width.</p>
        </div>

        {/* Center Section */}
        <div className="bg-blue-300 col-span-2 p-4">
          <h2>Center Section</h2>
          <p>This section takes the remaining width.</p>
        </div>
      </section>

      {/* Sticky Search Bar */}
      <div className="sticky bottom-0 bg-gray-200 text-white p-4">
        <form className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-2/3 p-2 rounded-l-md border-none focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500  px-4 py-2 rounded-r-md text-white hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistance;
