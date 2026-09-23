import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Contact Page</h1>
        <p className="text-gray-600 text-sm">
          If you have any questions regarding the React workshop, feel free to contact us!
        </p>
      </div>
    </div>
  );
};
