import React from 'react';

const NotFound = () => {
  return (
    <div className="bg-slate-50 flex flex-col min-h-screen">
      <div className="px-9 py-10">
        <h1 className="text-center">Error 404</h1>
        <div className="border-2 mx-96 py-3 pl-2 bg-white rounded">No match</div>
      </div>
    </div>
  );
};

export default NotFound;
