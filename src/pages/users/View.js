import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { capitalize, formattedDate } from '../../modules/helper';

export const View = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();

  const backToList = () => {
    navigate('/users');
  };
  useEffect(() => {
    if (id) {
      const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
      const getUser = tempUsers.find((element) => element.id === id);
      setUser((user) => ({ ...getUser }));
    }
  }, [id, setUser]);

  const userDetails = [
    { label: 'First Name', value: user?.firstName },
    { label: 'Last Name', value: user?.lastName },
    { label: 'Email', value: <Link className="underline text-blue-600">{user?.email}</Link> },
    { label: 'Gender', value: capitalize(user?.gender) },
    { label: 'Age', value: user?.age },
    { label: 'Address', value: user?.address },
    { label: 'Note', value: user?.note },
    { label: 'Created At', value: formattedDate(user?.createdAt) },
    { label: 'Updated At', value: formattedDate(user?.updatedAt) },
    { label: 'Status', value: capitalize(user?.status) }
  ];

  const navigateToEdit = () => {
    navigate(`/users/edit/${id}`);
  };
  console.log('user', user);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-5 min-h-screen flex flex-col">
        <div className="mt-4 mb-3 bg-gray-400 h-14 rounded">
          <div className="py-3 pl-5">
            <Link to="/dashboard">Dashboard</Link>&nbsp;/ &nbsp;
            <Link to="/users">Users</Link>&nbsp;/ &nbsp;
            <Link className="text-black no-underline">View</Link>
          </div>
        </div>
        <div className="mt-4 mb-0 font-bold flex justify-between">
          <h1 className="text-4xl">Users</h1>
          <Button onClick={backToList}>
            <i class="fa fa-arrow-left fa-xs" style={{ paddingRight: '10px' }}></i>
            Back to List
          </Button>
        </div>
        <div className="flex-grow mt-10 mb-0 flex flex-col">
          <div className="border-gray-200 border-2 rounded flex flex-col bg-white">
            <div className="rounded ml-7 my-6 mr-[28px]">
              <Table bordered hover>
                <tbody>
                  {userDetails.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th>{data?.label}</th>
                        <td>{data?.value}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2">
                      <span className="flex w-1/5 justify-between">
                        <button onClick={navigateToEdit} className="btn btn-outline-secondary">
                          <i class="fa fa-pencil fa-xs me-2"></i>Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <i class="fa fa-trash me-2"></i>Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
