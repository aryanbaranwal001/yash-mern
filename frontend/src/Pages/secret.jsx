import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to the Restaurant Booking Platform 🍽️
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Please register or login to book your table.
        </p>
        <div className="flex gap-4">
          <Link to="/register">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


