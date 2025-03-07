import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Urban Estate</h1>
        
        <p className="text-gray-600 text-lg text-center mb-6">
          Urban Estate is your go-to real estate platform where property owners can list their properties
          and clients can buy, rent, or sell with ease. Our mission is to connect buyers and sellers in
          the most seamless way possible.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-100 p-6 rounded-xl text-center shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700">For Property Owners</h2>
            <p className="text-gray-600 mt-2">List your properties effortlessly and reach potential buyers or tenants.</p>
          </div>
          
          <div className="bg-green-100 p-6 rounded-xl text-center shadow-md">
            <h2 className="text-2xl font-semibold text-green-700">For Clients</h2>
            <p className="text-gray-600 mt-2">Browse listings, buy, rent, or sell properties hassle-free.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
          <ul className="mt-4 space-y-3 text-gray-600 text-lg">
            <li>&#10003; Easy property listing & management</li>
            <li>&#10003; Verified listings for reliability</li>
            <li>&#10003; User-friendly interface</li>
            <li>&#10003; Secure transactions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

