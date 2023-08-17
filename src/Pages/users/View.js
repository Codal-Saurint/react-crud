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

  const navigateToEdit = () => {
    navigate(`/users/edit/${id}`);
  };
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
                {/* <thead></thead> */}
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{user?.firstName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Last Name</th>
                    <td>{user?.lastName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>
                      <Link className="underline text-blue-600">{user?.email}</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{capitalize(user?.gender)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Age</th>
                    <td>{user?.age}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{user?.address}</td>
                  </tr>
                  <tr>
                    <th scope="row">Note</th>
                    <td>{user?.note}</td>
                  </tr>
                  <tr>
                    <th scope="row">Created At</th>
                    <td>{formattedDate(user?.createdAt)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Updated At</th>
                    <td>{formattedDate(user?.updatedAt)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td>{capitalize(user?.status)}</td>
                  </tr>
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
