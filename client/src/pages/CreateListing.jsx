import React from 'react';
export default function CreateListing() {
    return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input type="text" 
            placeholder="Name" 
            className="border p-3 rounded-lg" 
            required />
            <textarea 
            placeholder="Description"
             className="border p-3 rounded-lg"
              required />
            <input type="text" 
            placeholder="Address"
             className="border p-3 rounded-lg" 
             required />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox"
                 className="w-5" /> 
                 <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" 
                className="w-5" /> 
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox"
                className="w-5" /> 
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" 
                className="w-5" />
                 <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" 
                className="w-5" /> 
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input type="number" min="1" max="10"
                 className="p-3 border border-gray-300 rounded-lg" />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min="1" max="10" 
                className="p-3 border border-gray-300 rounded-lg" />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min="1" 
                className="p-3 border border-gray-300 rounded-lg" />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">(₹/month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min="1"
                 className="p-3 border border-gray-300 rounded-lg" />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">(₹/month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-800 ml-2">
                The first image will be cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input className="p-3 border border-gray-400 rounded w-full" type="file" accept="image/*" multiple />
              <button className="p-3 text-green-700 border border-green-500 rounded uppercase hover:shadow-lg">
                Upload
              </button>
            </div>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">
              Create Listing
            </button>
          </div>
        </form>
      </main>
    );
  }