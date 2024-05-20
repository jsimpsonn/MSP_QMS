// app/components/InventoryScrapRequestForm.tsx
import React from 'react';

const InventoryScrapRequestForm = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Inventory Scrap Request</h1>
        <form>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block font-medium text-gray-700">Customer</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Attachments</label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500">
                <p className="text-sm text-gray-500">
                  Please attach evidence of the customers request to scrap material.
                </p>
                <div className="mt-2">
                  <label className="cursor-pointer">
                    <span className="text-blue-500">Attach file</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block font-medium text-gray-700">Tag Number</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Weight <span className="text-xs">(Lbs.)</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Plant Location</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              View Log
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryScrapRequestForm;
