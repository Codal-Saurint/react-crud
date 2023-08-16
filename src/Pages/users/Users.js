import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Table } from "reactstrap";
import { Pagination } from "../../components/shared/Pagination";
import * as faker from "@faker-js/faker";
import { formattedDate } from "../../utils/modules";

export const Users = () => {
	const [userData, setUserData] = useState([]);
	const [authenticated, setAuthenticated] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("authenticated");
		const users_group = JSON.parse(localStorage.getItem("STUSERS") || "[]");
		if (loggedInUser) {
			setAuthenticated(loggedInUser);
			if (users_group.length > 0) {
				setUserData(users_group);
			}
		} else {
			navigate("/login");
		}
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login");
	};

	const deleteUser = () => {
		alert("Hello");
	};

	const actionsArray = [
		{ function: "sort", name: "All" },
		{ function: "sort", name: "Active" },
		{ function: "sort", name: "Inactive" },
	];
	const filterPageArray = [
		{ function: "sort", name: "10" },
		{ function: "sort", name: "25" },
		{ function: "sort", name: "50" },
		{ function: "sort", name: "100" },
		{ function: "sort", name: "All" },
	];

	const navigateToViewUser = () => {
		navigate("/users/view");
	};
	const navigateToEditUser = () => {
		navigate("/users/edit");
	};
	const buttonContainer = (
		<span className="flex items-center">
			<button 
				type="button"
				className="btn btn-outline-dark btn-sm flex items-center justify-center p-0 w-6 h-6"
				onClick={navigateToViewUser}
			>
				<i class="fa fa-eye"></i>
			</button>
			<button
				type="button"
				className="btn btn-outline-dark btn-sm flex items-center justify-center p-0 w-6 h-6"
				onClick={navigateToEditUser}
			>
				<i class="fa fa-pencil"></i>
			</button>
			<button type="button" className="btn btn-outline-danger btn-sm flex items-center justify-center p-0 w-6 h-6">
				<i class="fa fa-trash"></i>
			</button>
		</span>
	);

	const navigateToAddUser = () => {
		navigate("/users/add");
	};
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-10 min-h-screen flex flex-col">
				<div className="mt-4 mb-3 bg-gray-400 h-14 rounded">
					<div className="py-3 pl-5">
						<Link to="/dashboard">Dashboard</Link>&nbsp;/ &nbsp;
						<Link to="/users">Users</Link>&nbsp;/ &nbsp;
						<Link className="text-black no-underline">List</Link>
					</div>
				</div>
				<div className="mt-4 mb-0 font-bold">
					<div className="flex justify-between py-3">
						<div className="flex flex-grow justify-between">
							<h1 className="text-4xl w-2/5">Users</h1>
							<div className="">
								<Button onClick={navigateToAddUser} className="my-2 mx-1">
									+ Add a User
								</Button>
								<Button className="my-2 mx-1" outline>
									<i class="fa fa-xs me-2 fa-random"></i>
									Add Random Users
								</Button>
								<Button className="my-2 mx-1" outline>
									<i class="fa fa-filter fa-xs me-2"></i>Reset Filter
								</Button>
								<Button className="my-2 mx-1" color="danger" outline>
									<i class="fa fa-trash me-2"></i>Delete All Users
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-grow mt-10 mb-0 flex flex-col">
					<div className="border-gray-200 border-2 rounded flex flex-col">
						<div className="rounded mx-3 my-6 flex min-h-max flex-col">
							<div className="flex justify-between h-20 mt-3">
								<div className="w-1/2 flex">
									Show{" "}
									<span>
										<Input bsSize="sm" className="mb-3 ml-3" type="select">
											<option>10</option>
											<option>25</option>
											<option>50</option>
											<option>100</option>
											<option>All</option>
										</Input>
									</span>
									&nbsp;&nbsp;&nbsp;&nbsp;entries
								</div>
								<div className="w-1/3 flex justify-end">
									<label className="mr-3 mt-2">
										<i class="fa fa-search"></i>
									</label>
									<Input className="h-2/4 !w-3/5" />
								</div>
							</div>
							<div>
								<Table bordered hover>
									<thead>
										<tr>
											<th >ID</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Email</th>
											<th>Created On</th>
											<th>Status</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<Input />
											</td>
											<td>
												<Input />
											</td>
											<td>
												<Input />
											</td>
											<td>
												<Input />
											</td>
											<td>
												<Input />
											</td>
											<td>
												<Input bsSize="sm" className="p-10" type="select">
													<option>All</option>
													<option>Active</option>
													<option>Inactive</option>
												</Input>
											</td>
											<td></td>
										</tr>
										{userData.map((data) => (
											<tr key={data.userId}>
												<td>
													<Link>{data?.id}</Link>
												</td>
												<td>{data?.firstName}</td>
												<td>{data?.lastName}</td>
												<td>
													<Link to={`mailto:${data?.email}`}>{data?.email}</Link>
												</td>
												<td>{formattedDate(data?.createdAt)}</td>
												<td>{data.status}</td>
												<td>{buttonContainer}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</div>
							<div className="flex justify-between">
								<div>Showing 1 to 10 of 3001 entries</div>
								<div>
									<Pagination />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
