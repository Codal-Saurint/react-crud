import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nFormatter } from '../../modules/helper';

export const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('STUSERS') || '[]');
    if (temp.length > 0) {
      setTotalUsers(temp);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-56 min-h-screen flex flex-col">
        <div className="mt-4 mb-0 font-bold">
          <h1 className="text-4xl">Dashboard</h1>
        </div>
        <div className="flex-grow mt-10 mb-0 flex flex-col">
          <div className="border-gray-200 border-2 rounded flex flex-col">
            <div className=" border-black border-2 rounded ml-7 my-6 mr-[800px] flex">
              <div className="flex-grow flex text-3xl items-center min-w-fit pl-8 py-5">
                {nFormatter(totalUsers.length, 0)}
              </div>
              <Link className="text-xl pt-10 pr-20 no-underline text-black" to="/users">
                Users
                <i className="fa fa-users ms-3 fa-2x"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
