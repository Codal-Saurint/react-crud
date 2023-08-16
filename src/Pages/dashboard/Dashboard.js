import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function nFormatter(num, digits) {
	const lookup = [
	  { value: 1, symbol: "" },
	  { value: 1e3, symbol: "k" },
	  { value: 1e6, symbol: "M" },
	  { value: 1e9, symbol: "G" },
	  { value: 1e12, symbol: "T" },
	  { value: 1e15, symbol: "P" },
	  { value: 1e18, symbol: "E" }
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup.slice().reverse().find(function(item) {
	  return num >= item.value;
	});
	return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }




export const Dashboard = () => {
	const [totalUsers,setTotalUsers] = useState(0)
	useEffect(() => {
		const temp = JSON.parse(localStorage.getItem("STUSERS") || "[]");
		if (temp.length > 0) {
			setTotalUsers(temp)
		}
	},[])
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-56 min-h-screen flex flex-col">
				<div className="mt-4 mb-0 font-bold">
					<h1 className="text-4xl">Dashboard</h1>
				</div>
				<div className="flex-grow mt-10 mb-0 flex flex-col">
					<div className="border-gray-200 border-2 rounded flex flex-col">
						<div className=" border-black border-2 rounded ml-7 my-6 mr-[800px] flex">
							<div className="flex-grow flex text-3xl items-center min-w-fit pl-8 py-5">{nFormatter(totalUsers.length,0)}</div>
							<Link className="text-xl pt-10 pr-20 no-underline text-black" to="/users">
								Users
								<i class="fa fa-users ms-3 fa-2x"></i>
							</Link>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};