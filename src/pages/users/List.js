import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Table } from 'reactstrap';
import { Pagination } from '../../components/shared/Pagination';
import * as faker from '@faker-js/faker';
import { formattedDate, getAge, get_random_status } from '../../modules/helper';
import { actionsArray, filterPageArray } from '../../data/constants';
import { capitalize } from '../../modules/helper';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { RandomUser } from '../../components/shared/RandomUser';

export const List = () => {
  const [userData, setUserData] = useState([]);
  const [authenticated, setAuthenticated] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [localStorageChanged, setLocalStorageChanged] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated');
    const users_group = JSON.parse(localStorage.getItem('STUSERS') || '[]');
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
      if (users_group.length > 0) {
        setUserData(users_group);
      }
    } else {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleOpenModal = (itemId) => {
    setSelectedId(itemId);
    setDeleteModal(true);
  };

  const navigateToViewUser = () => {
    navigate('/users/view');
  };
  const navigateToEditUser = () => {
    navigate('/users/edit');
  };

  const navigateToAddUser = () => {
    navigate('/users/add');
  };

  const deleteConfirmation = (id) => {
    if (id) {
      const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
      const userList = tempUsers.filter((element) => element.id !== id);
      setUserData(userList);
      localStorage.setItem('STUSERS', JSON.stringify(userList));
      setDeleteModal(!deleteModal);
    }
  };

  const addRandomUsers = (max_size) => {
    const tempUsers = RandomUser(max_size);
    setUserData(tempUsers);
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
              <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
                <ModalHeader
                  toggle={() => setDeleteModal(!deleteModal)}
                  close={() => setDeleteModal(!deleteModal)}
                >
                  Are you sure you want to delete?
                </ModalHeader>
                <ModalBody>
                  This will delete the selected data and you won't be able to revert this change
                  back.
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={() => deleteConfirmation(selectedId)}>
                    Confirm
                  </Button>
                  <Button color="secondary" onClick={() => setDeleteModal(!deleteModal)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <h1 className="text-4xl w-2/5">Users</h1>
              <div className="">
                <Button onClick={navigateToAddUser} className="my-2 mx-1">
                  + Add a User
                </Button>
                <Button className="my-2 mx-1" outline onClick={() => addRandomUsers(100)}>
                  <i className="fa fa-xs me-2 fa-random"></i>
                  Add Random Users
                </Button>
                <Button className="my-2 mx-1" outline>
                  <i className="fa fa-filter fa-xs me-2"></i>Reset Filter
                </Button>
                <Button className="my-2 mx-1" color="danger" outline>
                  <i className="fa fa-trash me-2"></i>Delete All Users
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
                  Show
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
                    <i className="fa fa-search"></i>
                  </label>
                  <Input className="h-2/4 !w-3/5" />
                </div>
              </div>
              <div>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
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
                        <td>{capitalize(data?.status)}</td>

                        <td className="flex items-center w-full">
                          <Link
                            to={`edit/${data.id}`}
                            className="btn btn-outline-dark flex items-center justify-center p-0 w-6 h-6"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link
                            to={`view/${data.id}`}
                            className="btn btn-outline-dark btn-sm flex items-center justify-center p-0 w-6 h-6"
                          >
                            <i className="fa fa-eye"></i>
                          </Link>
                          <Link
                            onClick={() => handleOpenModal(data?.id)}
                            className="btn btn-outline-danger btn-sm flex items-center justify-center p-0 w-6 h-6"
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </td>
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
