import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Table } from 'reactstrap';
import * as faker from '@faker-js/faker';
import { formattedDate, getAge, get_random_status } from '../../modules/helper';
import { actionsArray, filterPageArray } from '../../data/constants';
import { capitalize, removeHyphen, removeSpaceChangeCase } from '../../modules/helper';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { RandomUser } from '../../components/shared/RandomUser';

export const List = () => {
  const [userData, setUserData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAllUsersModal, setDeleteAllUsersModal] = useState(false);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [localStorageChanged, setLocalStorageChanged] = useState(false);
  const pageSize = 10;
  const pagesToShow = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [changedId, setChangedId] = useState('');
  const [changedFirstName, setChangedFirstName] = useState('');
  const [changedLastName, setChangedLastName] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [changedStatus, setChangedStatus] = useState('');
  //const [statusFilter, setStatusFilter] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleOpenModal = (itemId) => {
    setSelectedId(itemId);
    setDeleteModal(true);
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
    const lcUsers = JSON.parse(localStorage.getItem('STUSERS'));
    if (lcUsers) {
      const updatedArray = [...lcUsers, ...tempUsers];
      localStorage.setItem('STUSERS', JSON.stringify(updatedArray));
    } else {
      localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
    }
  };

  const handleColumnSearch = (e, filterType) => {
    console.log('LAST', e, filterType);
    switch (filterType) {
      case 'id':
        setChangedId(e.target.value);
        break;
      case 'firstName':
        setChangedFirstName(e.target.value);
        break;
      case 'lastName':
        setChangedLastName(e.target.value);
        break;
      case 'email':
        setChangedEmail(e.target.value);
        break;
      case 'status':
        setChangedStatus(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const usersLC = JSON.parse(localStorage.getItem('STUSERS') || '[]');

    if (usersLC.length > 0) {
      let filteredData = usersLC;
      if (changedId !== '') {
        filteredData = filteredData.filter((item) =>
          removeHyphen(item.id).toLowerCase().includes(changedId.toLowerCase())
        );
      }
      if (changedFirstName !== '') {
        filteredData = filteredData.filter((item) =>
          removeHyphen(item.firstName).toLowerCase().includes(changedFirstName.toLowerCase())
        );
      }

      if (changedLastName !== '') {
        filteredData = filteredData.filter((item) =>
          removeHyphen(item.lastName).toLowerCase().includes(changedLastName.toLowerCase())
        );
      }

      if (changedEmail !== '') {
        filteredData = filteredData.filter((item) =>
          removeHyphen(item.email).toLowerCase().includes(changedEmail.toLowerCase())
        );
      }
      if (changedStatus !== '') {
        let statusLowerCase = changedStatus.toLowerCase();
        if (statusLowerCase !== 'all') {
          filteredData = filteredData.filter((item) => item.status === statusLowerCase);
        }
      }
      setUserData(filteredData);
    }
  }, [changedId, changedFirstName, changedLastName, changedEmail, changedStatus]);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(userData.length / pageSize); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber - 1);
  const pagesCount = Math.ceil(userData.length / pageSize);
  const startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 0);
  const endPage = Math.min(startPage + pagesToShow - 1, pagesCount - 1);

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
              <Modal isOpen={deleteAllUsersModal} toggle={() => setDeleteModal(!deleteModal)}>
                <ModalHeader
                  toggle={() => setDeleteModal(!deleteModal)}
                  close={() => setDeleteModal(!deleteModal)}
                >
                  Are you sure you want to delete?
                </ModalHeader>
                <ModalBody>
                  This will delete all data in table and you won't be able to revert this change
                  back.
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => {
                      setUserData([]);
                      localStorage.setItem('STUSERS', JSON.stringify(''));
                      setDeleteAllUsersModal(!deleteAllUsersModal);
                    }}
                  >
                    Confirm
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => setDeleteAllUsersModal(!deleteAllUsersModal)}
                  >
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
                <Button
                  className="my-2 mx-1"
                  color="danger"
                  outline
                  onClick={() => {
                    setDeleteAllUsersModal(!deleteAllUsersModal);
                  }}
                >
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
                <div className="w-1/3 h-1/2 flex justify-end">
                  <label className="mr-3 mt-2">
                    <i className="fa fa-search"></i>
                  </label>
                  <Input
                    type="search"
                    onChange={(e) => handleColumnSearch(e)}
                    name="globalSearch"
                  />
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
                        <Input
                          type="search"
                          onChange={(e) => handleColumnSearch(e, 'id')}
                          name="id"
                        />
                      </td>
                      <td>
                        <Input
                          type="search"
                          onChange={(e) => handleColumnSearch(e, 'firstName')}
                          name="firstName"
                        />
                      </td>
                      <td>
                        <Input
                          type="search"
                          onChange={(e) => handleColumnSearch(e, 'lastName')}
                          name="lastName"
                        />
                      </td>
                      <td>
                        <Input
                          type="search"
                          onChange={(e) => handleColumnSearch(e, 'email')}
                          name="email"
                        />
                      </td>
                      <td>
                        <Input
                          type="search"
                          onChange={(e) => handleColumnSearch(e, 'search')}
                          name="createdAt"
                        />
                      </td>
                      <td>
                        <Input
                          bsSize="sm"
                          className="p-10"
                          type="select"
                          onChange={(e) => {
                            handleColumnSearch(e, 'status');
                          }}
                        >
                          <option>All</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </Input>
                      </td>
                      <td></td>
                    </tr>

                    {userData.length > 0 ? (
                      userData
                        .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                        .map((data) => (
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
                        ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">
                          No results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="flex justify-between">
                <div>
                  Showing {currentPage * pageSize + 1} to{' '}
                  {Math.min((currentPage + 1) * pageSize, userData.length)} of {userData?.length}{' '}
                  entries
                </div>
                <div>
                  <React.Fragment>
                    <div className="pagination-wrapper">
                      <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={currentPage <= 0}>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(0);
                            }}
                            first
                            href="#"
                          />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage <= 0}>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage - 1);
                            }}
                            previous
                            href="#"
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: endPage - startPage + 1 },
                          (_, i) => startPage + i
                        ).map((pageNumber) => (
                          <PaginationItem key={pageNumber} active={pageNumber === currentPage}>
                            <PaginationLink
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNumber);
                              }}
                            >
                              {pageNumber + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem disabled={currentPage >= pagesCount - 1}>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage + 1);
                            }}
                            next
                            href="#"
                          />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage >= pagesCount - 1}>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pagesCount - 1);
                            }}
                            last
                            href="#"
                          />
                        </PaginationItem>
                      </Pagination>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
