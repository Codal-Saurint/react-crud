import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Table } from 'reactstrap';
import { formattedDate } from '../../modules/helper';
import { capitalize, removeHyphen } from '../../modules/helper';
import { initialHeadingClicks, showPageNumber } from '../../data/constants';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [changedId, setChangedId] = useState('');
  const [changedFirstName, setChangedFirstName] = useState('');
  const [changedLastName, setChangedLastName] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [changedStatus, setChangedStatus] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredCount, setFilteredCount] = useState(0);
  const [sortedField, setSortedField] = useState(null);
  const [hasClickedHeading, setHasClickedHeading] = useState({ initialHeadingClicks });
  const [sortIcon, setSortIcon] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const pageNumbers = [];
  const pagesToShow = 10;

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
    const lcUsers = JSON.parse(localStorage.getItem('STUSERS'));
    if (lcUsers) {
      console.log('A');
      const updatedUsers = tempUsers.concat(lcUsers);
      setUserData(updatedUsers);
      localStorage.setItem('STUSERS', JSON.stringify(updatedUsers));
      setTotalUsers(updatedUsers.length);
      if (pagesToShow === 'All') {
        setPageSize(updatedUsers.length); // Set the page size to show all records
      }
    } else {
      console.log('B');
      setUserData(tempUsers);
      localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
      setTotalUsers(tempUsers.length);
      if (pagesToShow === 'All') {
        setPageSize(tempUsers.length); // Set the page size to show all records
      }
    }
    setCurrentPage(0);

    console.log('END', userData.length);
  };

  useEffect(() => {
    setTotalUsers(userData.length);
  }, [userData]);

  const handleColumnSearch = (e, filterType) => {
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

  const changePageSize = React.useCallback(
    (e) => {
      let pagesToShow = e.target.value;
      console.log('PAGE', pagesToShow);
      if (pagesToShow === 'All') {
        setCurrentPage(0); // Reset the current page to the first page
        setPageSize(totalUsers); // Set the page size to show all records
      } else {
        setPageSize(Number(pagesToShow)); // Set the page size to the selected value
      }
    },
    [totalUsers]
  );

  const filteredData = useMemo(() => {
    let computedData = Array.from(userData);

    if (sortedField !== null) {
      console.log('FIELD', sortedField);
    }

    if (globalSearch !== '') {
      computedData = computedData.filter(
        (item) =>
          removeHyphen(item.id).toLowerCase().includes(globalSearch.toLowerCase()) ||
          removeHyphen(item.firstName).toLowerCase().includes(globalSearch.toLowerCase()) ||
          removeHyphen(item.lastName).toLowerCase().includes(globalSearch.toLowerCase()) ||
          removeHyphen(item.email).toLowerCase().includes(globalSearch.toLowerCase())
      );
    }

    if (changedId !== '') {
      computedData = computedData.filter((item) =>
        removeHyphen(item.id).toLowerCase().includes(changedId.toLowerCase())
      );
    }
    if (changedFirstName !== '') {
      computedData = computedData.filter((item) =>
        removeHyphen(item.firstName).toLowerCase().includes(changedFirstName.toLowerCase())
      );
    }

    if (changedLastName !== '') {
      computedData = computedData.filter((item) =>
        removeHyphen(item.lastName).toLowerCase().includes(changedLastName.toLowerCase())
      );
    }

    if (changedEmail !== '') {
      computedData = computedData.filter((item) =>
        removeHyphen(item.email).toLowerCase().includes(changedEmail.toLowerCase())
      );
    }
    if (changedStatus !== '') {
      let statusLowerCase = changedStatus.toLowerCase();
      if (statusLowerCase !== 'all') {
        computedData = computedData.filter((item) => item.status === statusLowerCase);
      }
    }

    if (userData.length !== computedData.length) {
      setFilteredCount(computedData.length);
    } else {
      setFilteredCount(0);
    }

    setPageSize(pageSize);

    setTotalUsers(userData.length);

    const maxPage = Math.max(0, Math.ceil(computedData.length / pageSize) - 1);
    setCurrentPage((prevPage) => Math.min(prevPage, maxPage));

    let slicedData = computedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    console.log('MM', totalUsers, pageSize, userData.length, computedData.length);
    return slicedData;
  }, [
    currentPage,
    changedId,
    changedEmail,
    changedFirstName,
    changedLastName,
    changedStatus,
    userData,
    globalSearch,
    pageSize,
    sortedField,
    totalUsers
  ]);

  const sortedItems = React.useMemo(() => {
    let sortedData = [...filteredData];
    if (sortedField !== null) {
      sortedData.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortIcon(sortIcon ? 'down' : 'up');
    return sortedData;
  }, [filteredData, sortedField, sortConfig, sortIcon]);

  //This function is called when sorting operation needs to be applied
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setHasClickedHeading((prevClicks) => ({
      ...prevClicks,
      [key]: true
    }));
    setSortConfig({ key, direction });
    setSortedField(key);
  };
  useEffect(() => {
    const usersLC = JSON.parse(localStorage.getItem('STUSERS') || '[]');
    if (usersLC) {
      setUserData(usersLC);
    }
  }, []);

  useEffect(() => {
    // This code will run whenever pageSize changes
    console.log('Updated Page Size:', pageSize);

    // You can perform any actions that depend on the updated pageSize here

    // Example: Recalculate page numbers or trigger any relevant logic
    const pagesCount = Math.ceil(totalUsers / pageSize);
    console.log('Updated CEIL', pagesCount, totalUsers, pageSize);

    // ... other logic that depends on pageSize ...
  }, [pageSize, totalUsers, changePageSize]); // Include totalUsers if it's used in the calculation

  for (let i = 1; i <= Math.ceil(totalUsers / pageSize); i++) {
    pageNumbers.push(i);
  }
  const pagesCount = totalUsers === 0 ? 1 : Math.ceil(totalUsers / pageSize);
  console.log('COUNT', pagesCount, totalUsers, pageSize);
  const startIndex = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
  const endIndex = Math.min(filteredCount - 1, startIndex + pagesToShow - 1);

  //Function to display filteredCount when user uses column filter
  function displayCount(displayedCount) {
    if (filteredCount > 0) {
      displayedCount = filteredCount < displayedCount ? filteredCount : displayedCount;
    } else if (
      globalSearch !== '' ||
      changedId !== '' ||
      changedFirstName !== '' ||
      changedLastName !== '' ||
      changedEmail !== '' ||
      changedStatus !== ''
    ) {
      displayedCount = 0;
    } else {
      displayedCount = userData.length < displayedCount ? userData.length : displayedCount;
    }
    return displayedCount;
  }

  const deleteAllUsers = () => {
    setUserData([]);
    localStorage.setItem('STUSERS', JSON.stringify(''));
    setDeleteAllUsersModal(!deleteAllUsersModal);
    setCurrentPage(0);
    setTotalUsers(userData.length);
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
                      deleteAllUsers();
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
                <Button
                  className="my-2 mx-1"
                  outline
                  onClick={() => {
                    setChangedId('');
                    setChangedFirstName('');
                    setChangedLastName('');
                    setChangedEmail('');
                    setChangedStatus('all');
                    setGlobalSearch('');
                  }}
                >
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
                    <Input
                      bsSize="sm"
                      className="mb-3 ml-3"
                      type="select"
                      onChange={(e) => changePageSize(e)}
                    >
                      {showPageNumber.map((page) => (
                        <option value={page}>{page}</option>
                      ))}
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
                    value={globalSearch}
                    onChange={(e) => {
                      setGlobalSearch(e.target.value);
                    }}
                    name="globalSearch"
                  />
                </div>
              </div>
              <div>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>
                        <div
                          onClick={() => requestSort('id')}
                          className="hover:cursor-pointer flex justify-between"
                        >
                          ID
                          {sortConfig &&
                            sortConfig.key === 'id' && ( // Check if sortConfig is not null and the current column is 'id'
                              <i
                                className={`fa fa-caret-${
                                  sortConfig.direction === 'ascending' ? 'down' : 'up'
                                }`}
                              ></i>
                            )}
                        </div>
                      </th>
                      <th>
                        <div
                          onClick={() => requestSort('firstName')}
                          className="hover:cursor-pointer flex justify-between"
                        >
                          First Name
                          {sortConfig && sortConfig.key === 'firstName' && (
                            <i
                              className={`fa fa-caret-${
                                sortConfig.direction === 'ascending' ? 'down' : 'up'
                              }`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th>
                        <div
                          onClick={() => requestSort('lastName')}
                          className="hover:cursor-pointer flex justify-between"
                        >
                          Last Name
                          {sortConfig && sortConfig.key === 'lastName' && (
                            <i
                              className={`fa fa-caret-${
                                sortConfig.direction === 'ascending' ? 'down' : 'up'
                              }`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th>
                        <div
                          onClick={() => requestSort('email')}
                          className="hover:cursor-pointer flex justify-between"
                        >
                          Email Address
                          {sortConfig && sortConfig.key === 'email' && (
                            <i
                              className={`fa fa-caret-${
                                sortConfig.direction === 'ascending' ? 'down' : 'up'
                              }`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th>
                        <div
                          onClick={() => requestSort('createdAt')}
                          className="hover:cursor-pointer flex justify-between"
                        >
                          Created On
                          {sortConfig && sortConfig.key === 'createdAt' && (
                            <i
                              className={`fa fa-caret-${
                                sortConfig.direction === 'ascending' ? 'down' : 'up'
                              }`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th>
                        <div
                          onClick={() => requestSort('status')}
                          className="hover:cursor-pointer flex justify-between"
                        >
                          Status
                          {sortConfig && sortConfig.key === 'status' && (
                            <i
                              className={`fa fa-caret-${
                                sortConfig.direction === 'ascending' ? 'down' : 'up'
                              }`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th>Actions</th>
                    </tr>
                    <tr>
                      <th>
                        <Input
                          type="search"
                          value={changedId}
                          onChange={(e) => handleColumnSearch(e, 'id')}
                          name="id"
                        />
                      </th>
                      <th>
                        <Input
                          type="search"
                          value={changedFirstName}
                          onChange={(e) => handleColumnSearch(e, 'firstName')}
                          name="firstName"
                        />
                      </th>
                      <th>
                        <Input
                          type="search"
                          value={changedLastName}
                          onChange={(e) => handleColumnSearch(e, 'lastName')}
                          name="lastName"
                        />
                      </th>
                      <th>
                        <Input
                          type="search"
                          value={changedEmail}
                          onChange={(e) => handleColumnSearch(e, 'email')}
                          name="email"
                        />
                      </th>
                      <th>
                        <Input
                          type="search"
                          onChange={(e) => handleColumnSearch(e, 'search')}
                          name="createdAt"
                        />
                      </th>
                      <th>
                        <Input
                          bsSize="sm"
                          className="p-10"
                          value={changedStatus}
                          type="select"
                          onChange={(e) => {
                            handleColumnSearch(e, 'status');
                          }}
                        >
                          <option>All</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </Input>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedItems.length > 0 ? (
                      sortedItems.map((data) => (
                        <tr key={data.userId}>
                          <td>
                            <Link to={`view/${data.id}`}>{data?.id}</Link>
                          </td>
                          <td>{data?.firstName}</td>
                          <td>{data?.lastName}</td>
                          <td>
                            <Link to={`mailto:${data?.email}`}>{data?.email}</Link>
                          </td>
                          <td>{formattedDate(data?.createdAt)}</td>
                          <td>{capitalize(data?.status)}</td>

                          <td>
                            <div className="flex items-center w-full">
                              <Link
                                to={`view/${data.id}`}
                                className="btn btn-outline-dark btn-sm flex items-center justify-center p-0 w-6 h-6"
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              <Link
                                to={`edit/${data.id}`}
                                className="btn btn-outline-dark flex items-center justify-center p-0 w-6 h-6"
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>

                              <Link
                                onClick={() => handleOpenModal(data?.id)}
                                className="btn btn-outline-danger btn-sm flex items-center justify-center p-0 w-6 h-6"
                              >
                                <i className="fa fa-trash"></i>
                              </Link>
                            </div>
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
                  <p>
                    {pageSize === userData.length
                      ? `Showing all (${displayCount(pageSize)}) entries`
                      : `Showing ${displayCount(currentPage * pageSize + 1)} to ${displayCount(
                          (currentPage + 1) * pageSize
                        )}`}{' '}
                    {filteredCount > 0 ||
                    globalSearch !== '' ||
                    changedId !== '' ||
                    changedFirstName !== '' ||
                    changedLastName !== '' ||
                    changedEmail !== '' ||
                    changedStatus !== ''
                      ? pageSize === userData.length
                        ? `(filtered from ${userData.length} total entries)`
                        : `of ${filteredCount} entries (filtered from ${userData.length} total entries)`
                      : `of ${userData.length} entries`}
                  </p>
                </div>
                {console.log('TRICK', currentPage, pagesToShow, pagesCount)}
                {userData.length > 0 && (
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

                          {[...Array(pagesCount)].map((_, i) => {
                            if (
                              i >= currentPage - Math.floor(pagesToShow / 2) &&
                              i <= currentPage + Math.floor(pagesToShow / 2)
                            ) {
                              return (
                                <PaginationItem key={i} active={i === currentPage}>
                                  <PaginationLink
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setCurrentPage(i);
                                    }}
                                  >
                                    {i + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
